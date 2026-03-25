import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

function SocialAuth() {
  return (
    <div className='mt-6'>
      <p className='text-sm mb-2 text-gray-300'>Or continue with</p>

      <div className='flex gap-6'>
        <button className='social-btn'>
          <FontAwesomeIcon icon={faGoogle} className='text-2xl' />
        </button>

        <button className='social-btn'>
          <FontAwesomeIcon icon={faGithub} className='text-2xl' />
        </button>

        <button className='social-btn'>
          <FontAwesomeIcon icon={faLinkedin} className='text-2xl' />
        </button>
      </div>
    </div>
  );
}

export default SocialAuth;
