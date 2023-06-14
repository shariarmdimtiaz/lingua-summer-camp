import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import icon from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-black border border-indigo-600 rounded-xl">
      <div className="container mx-auto py-12 px-4">
        <div className="pb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img className="" src={icon} />
                </div>
              </div>
              <h1 className="text-black font-bold text-2xl ps-2">
                <span className="text-indigo-600">Lingua</span>{" "}
                <span className="text-black">Summer Camp</span>
              </h1>
            </div>
            <p className="font-light text-left py-3">
              There are many variations of passages of Lorem Ipsum , but the
              majority have suffered alteration in some form.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-left ps-5">Company</h3>
            <ul className="list-none text-left ps-5">
              <li className="mb-2">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#">Work</a>
              </li>
              <li className="mb-2">
                <a href="#">Latest News</a>
              </li>
              <li className="mb-2">
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-left ps-5">Product</h3>
            <ul className="list-none text-left ps-5">
              <li className="mb-2">
                <a href="#">Language Toys</a>
              </li>
              <li className="mb-2">
                <a href="#">Math Toys</a>
              </li>
              <li className="mb-2">
                <a href="#">Science Toys</a>
              </li>
              <li className="mb-2">
                <a href="#">Engineering Toys</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-left ps-5">Support</h3>
            <ul className="list-none text-left ps-5">
              <li className="mb-2">
                <a href="#">Help Desk</a>
              </li>
              <li className="mb-2">
                <a href="#">Sales</a>
              </li>
              <li className="mb-2">
                <a href="#">Become a partner</a>
              </li>
              <li className="mb-2">
                <a href="#">Developers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-left ps-5">Contact</h3>
            <p className="text-left ps-5">529 Broadway , NY USA</p>
            <p className="text-left ps-5">+1 717 - 958 - 5970</p>
            <div className="text-left">
              <h2 className="text-lg font-bold mb-4 pt-2 ps-5">Follow Us</h2>
              <ul className="flex ps-5 -mt-5">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-400 mr-4 px-2"
                  >
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-400 mr-4 px-2"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-400 mr-4 px-2"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-12">
        <div className="container mx-auto px-4 md:flex justify-center">
          <div>
            <p className="text-center">
              @2023 Lingua Summer Camp. All Rights Reserved
            </p>
          </div>
          <div>
            <p className="text-center">
              Powered by{" "}
              <span className="font-extrabold">Lingua Summer Camp</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
