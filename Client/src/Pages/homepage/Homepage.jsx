import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
import './homepage.css'
function Homepage() {
  return (
    <div className='Homepage'>
    <img src="/orbital.png" alt="orbital" className='orbital'  />
    <div className="left">
      <h1>JOD AI</h1>
      <h2>Creating a Personal Chat AI: A Tailored Solution for Seamless Conversations</h2>
      <h3>Ready for Conversation.</h3>
      <Link to="/dashboard">Get Started</Link>
    </div>
    <div className="right">
      <div className="imgContainer">
        <div className="bgContainer">
          <div className="bg"></div>
        </div>
        <img src="/bot.png" alt="" className='bot' />
        <div className="chat">
        {/* <img src="/bot.png" alt="" /> */}
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Human:Who are Your?',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Bot:Your AI-powered virtual assistant.',
        1000,
        'Human:How can u assist me',
        1000,
        'Bot: I can assist you with a wide range of tasks',
        1000
      ]}
      wrapper="span"
      repeat={Infinity}
      cursor={true}
      omitDeletionAnimation={true}
    />
        </div>
      </div>
    </div>
    <div className="terms">
      <img src="/logo.png" alt="" />
      <div className="links">
      <Link to="/">Terms of Service</Link>
      <Link to="/">Privacy Policy</Link>

      </div>
    </div>
    </div>
  )
}

export default Homepage