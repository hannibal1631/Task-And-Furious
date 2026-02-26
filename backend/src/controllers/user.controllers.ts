import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { sendEmail } from "../utils/mailer";

const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token",
    );
  }
};

const signupUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // create user object - create entry in db
  // check both password is match or not
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { name, username, email, password, reEnterPassword } = req.body;

  if (
    [name, username, email, password, reEnterPassword].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or full name already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    reEnterPassword,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User sign up successfully"));
});

const signinUser = asyncHandler(async (req, res) => {
  // req body -> data
  // validation of email
  // find the user
  // password check
  // access and refresh token
  // send cookie

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id.toString(),
  );

  const signInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: signInUser,
          accessToken,
          refreshToken,
        },
        "User sign in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies

  const userId = (req as any).user?._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      returnDocument: "after",
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // return res

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        (req as any).user,
        "Current user fetched successfully",
      ),
    );
});

const createProfilePicture = asyncHandler(async (req, res) => {
  // extract userId from params
  // get local file path
  // validation: profilePicture is required
  // upload the image file to cloudinary
  // validation: uploadProfilePicture is required
  // update the user's document with the new cloudinary image URL
  // return res

  const { userId } = req.params;
  const profilePicturePath = req.file?.path;

  if (!profilePicturePath) {
    throw new ApiError(400, "Profile picture path is required");
  }

  const uploadProfilePicture = await uploadOnCloudinary(profilePicturePath);

  if (!uploadProfilePicture) {
    throw new ApiError(400, "Upload profile picture is required");
  }

  const newProfilePicture = await User.findByIdAndUpdate(userId, {
    profilePicture: uploadProfilePicture.url,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newProfilePicture,
        "Profile picture create successfully",
      ),
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
  // get user email from frontend
  // check email
  // send link to email
  // return res

  const { email } = req.body;

  const validEmail = await User.findOne({ email });

  if (!validEmail) {
    throw new ApiError(401, "Invalid credential");
  }

  await sendEmail({ email, emailType: "RESET", userId: validEmail._id });

  return res.status(200).json(new ApiResponse(200, "Send to you email id"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // get token
  // get newPassword and reEnterNewPassword from frontend
  // validation - not empty
  // check newPassword and reEnterNewPassword is same
  // find user by token
  // check user invalid or expire
  // return res

  const { token } = req.params;
  const { newPassword, reEnterNewPassword } = req.body;

  if (!newPassword || !reEnterNewPassword) {
    throw new ApiError(400, "Please enter the both fields");
  }

  if (newPassword !== reEnterNewPassword) {
    throw new ApiError(404, "Password do not match");
  }

  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(409, "Invalid or expired token");
  }

  user.password = newPassword;
  user.reEnterPassword = reEnterNewPassword;

  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save();

  res.status(200).json(new ApiResponse(200, "Password reset successfully"));
});

export {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  createProfilePicture,
  forgotPassword,
  changeCurrentPassword,
};
