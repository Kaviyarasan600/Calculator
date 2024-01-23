import { Calculator } from "./Components/Calculator"
import { Navbar } from "./Components/Heading/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <section className="container">
        <Calculator />
      </section>
    </>
  )
}

export default App
