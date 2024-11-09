import { BiSolidRightArrow } from "react-icons/bi";
import { FaLocationArrow, FaRegEnvelope } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <aside>
                <div className=" text-2xl "><div className="flex flex-col items-center"><div><span className="text-red-500">Learn</span> Live</div><p className="text-xs font-light text-red-500">Ensuring Quality Learning Platform</p></div></div>
                    <div>
                        <p className="text-2xl">Contact Us</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <FaRegEnvelope className="text-red-500" />
                                <div className="flex flex-col">
                                    <a className="text-base hover:text-red-500" href="">support@bloodbridge.com</a>
                                    <a className="text-base hover:text-red-500" href="">helpdesk@bloodbridge.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaLocationArrow className="text-red-500" />
                                <div className="flex flex-col">
                                    <p className="text-base">Road-2,3/A Banani</p>
                                    <p className="text-base">Dhaka-1206, Bangladesh</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-red-500" />
                                <div className="flex flex-col">
                                    <p className="text-base">Office:  (+880) 0823 560 433</p>
                                    <p className="text-base">Cell:  (+880) 0723 161 343</p>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </aside>
                <nav>
                    <div className="flex justify-center w-full">
                        <h6 className=" footer-title text-2xl">Support Link</h6> 
                    </div>
                    <div className="flex justify-center gap-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="">Courses</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="">Blogs</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="">Extra Curricular</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="">Explore</a>
                            </div>
                            
                        </div>
                        <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="/register">Register</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="/donationrequests">Activities</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="searchdonar">Reviews</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiSolidRightArrow className="text-red-500" />
                                <a className="text-base hover:text-red-500" href="/blogs">Blogs</a>
                            </div>
                        </div>
                    </div>
                </nav> 
                {/* <nav>
                    <h6 className="footer-title">Legal</h6> 
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>  */}
                <form>
                    <h6 className="footer-title text-2xl">Newsletter</h6> 
                    <fieldset className="form-control">
                    <label className="label">
                        <span className="label-text text-white">Enter your email address</span>
                    </label> 
                    <div className="join">
                        <input type="text" placeholder="email" className="input input-bordered join-item" /> 
                        <button className="btn -ml-10 md:-ml-20 lg:-ml-0 bg-red-500 text-white join-item">Subscribe</button>
                    </div>
                    </fieldset>
                </form>
            </footer>
            <div className="footer footer-center p-4 bg-neutral text-neutral-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by Learn Live Org.</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;