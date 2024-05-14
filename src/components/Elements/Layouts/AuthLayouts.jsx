import { Link } from "react-router-dom"

const AuthLayout = (props) => {
    const { title, children, type } = props
    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className='w-full max-w-xs'>
                <h1 className='text-2xl font-semibold mb-2 text-blue-600'>{title}</h1>
                <p className='font-medium text-slate-500 mb-6'>Welcome, Please enter your details</p>
                {children}
                {/* <p className="mt-5">
                    {type === "login" ? "Don't have an account? " : "Already have an account? "}

                    {type === "login" &&
                        <Link to="/register" className="text-blue-900 font-bold">
                            Register
                        </Link>
                    }

                    {type === "register" &&
                        <Link to="/login" className="text-blue-900 font-bold">
                            Login
                        </Link>
                    }
                </p> */}
                <Navigation type={type}/>
            </div>
        </div>
    )
}

const Navigation = ({ type }) => {
    if (type === "login") {
        return (
            <p className="mt-5">
               Don't have an account? <Link to="/register" className="text-blue-900 font-bold">
                        Register
                    </Link>
            </p>
        )
    } else {
        return (
            <p className="mt-5">Already have an account? <Link to="/login" className="text-blue-900 font-bold ">Log In</Link></p>
        )
    }
}


export default AuthLayout

