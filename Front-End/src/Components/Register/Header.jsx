import logo from "../../Assets/Images/logo.png"
import { Link } from "react-router-dom"
function Header(){
    return(
        <div>

              <Link to="/" >
                    <img className="w-36 p-6" src={logo} alt="logo"/>
                </Link>
        </div>
    )
}

export default Header