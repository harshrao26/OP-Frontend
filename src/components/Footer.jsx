import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10">
      {/* Top Section */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Contact Us */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <p>Online Planet Pvt. Ltd.</p>
            <p>1st Floor LHPS Building, Sector-7, Vikas Nagar</p>
            <p>Lucknow, Uttar Pradesh, 226001</p>
            <p>Email: support@onlineplanet.in</p>
            <p>Phone: +91 9721080912</p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul>
              <li><a href="/about" className="hover:underline">Company Information</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/press" className="hover:underline">Press Releases</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul>
              <li><a href="/payments" className="hover:underline">Payments</a></li>
              <li><a href="/shipping" className="hover:underline">Shipping</a></li>
              <li><a href="/cancellation" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="font-bold mb-4">Policy</h4>
            <ul>
              <li><a href="/return-policy" className="hover:underline">Return Policy</a></li>
              <li><a href="/terms-of-use" className="hover:underline">Terms Of Use</a></li>
              <li><a href="/security" className="hover:underline">Security</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy</a></li>
              <li><a href="/sitemap" className="hover:underline">Sitemap</a></li>
              <li><a href="/epr-compliance" className="hover:underline">EPR Compliance</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61575003118983" className="hover:underline">Facebook</a>
              <a href="https://www.instagram.com/naturemedia" className="hover:underline">Instagram</a>
              <a href="https://www.linkedin.com/company/naturemedia" className="hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 py-4 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Online Planet Pvt. Ltd. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
