import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#3F4651] text-[#EBECED] py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Vara-Hobe */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Vara-Hobe</h3>
          <p className="text-sm">
            Vara-Hobe is dedicated to solving rental issues in Bangladesh by
            connecting tenants and landlords in a seamless way.
          </p>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help-center" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <p className="text-sm">Email: support@varahobe.com</p>
          <p className="text-sm">Phone: +880-123-456-789</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#C0BCB5] mt-8"></div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-4">
        <p>© {new Date().getFullYear()} Vara-Hobe. All rights reserved.</p>
      </div>
    </footer>
  );
}
