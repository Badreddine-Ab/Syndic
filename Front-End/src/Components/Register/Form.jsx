
import {Link} from "react-router-dom"



export default function Form(props){
    
    
    return(
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 border-gold">
             
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-base font-light text-red-500 dark:text-red-400">
                    { props.error ? props.error : props.response}
                    </p>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {props.Title}
                    
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={props.HandleSubmit} method={props.method} action="">
                       {props.children}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Terms and Conditions</Link></label>
                            </div>                           
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 hover:text-gold dark:focus:ring-primary-800">Submit</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {/* <Link className="font-medium text-gold hover:underline dark:text-primary-500" to="/forgetPassword">Forget Password ? </Link> */}
                           {/* {props.navigate} <Link to={props.to} className="font-medium text-gold hover:underline dark:text-primary-500">{props.redirect}</Link> */}
                        </p>
                    </form>
                </div>
            </div>
    )
}

