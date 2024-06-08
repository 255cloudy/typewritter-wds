import "./style.css"
import Typewriter from "./typewriter"

const typewriter = new Typewriter(
  document.querySelector(".whitespace") as HTMLDivElement,
  {
    loop: false,
    typingSpeed: 50,
    deletingSpeed: 50,
  }
)

typewriter
  .typeString("Where do I start?")
  .pauseFor(1000)
  .typeString("\n\nfunctio")
  .deleteChars(7)
  .typeString("const temp")
  .pauseFor(150)
  .deleteAll(10)
  .typeString("Why is this so hard?")
  .pauseFor(1000)
  .typeString("\n\nDoes everyone struggle this much?")
  .pauseFor(1000)
  .typeString("\n\nThere has to be an easier way")
  .pauseFor(2000)
  .deleteAll(10)
  .start()