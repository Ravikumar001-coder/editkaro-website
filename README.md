# 🎬 Editkaro.in - Video Editing & Social Media Marketing Agency Website

A complete, responsive, multi-page website built with HTML, CSS (Tailwind), and JavaScript featuring Google Sheets integration for form submissions.

## 📁 Project Structure

```
Editkaro.in/
│
├── index.html          # Home page with hero, services, newsletter, testimonials
├── portfolio.html      # Portfolio showcase with filterable categories
├── about.html          # About us page with mission, vision, and team
├── contact.html        # Contact page with form and FAQ
│
├── css/
│   └── styles.css      # Custom CSS styles and animations
│
├── js/
│   └── script.js       # JavaScript for interactivity and form handling
│
└── assets/             # Place images and media files here
```

## ✨ Features

### Pages Included:
1. **Home Page** - Hero section, services showcase, email subscription form, testimonials, CTA sections
2. **Portfolio Page** - Filterable video categories (Short Form, Long Form, Gaming, Football Edits, eCommerce Ads, Documentary, Color Grading, Anime, Ads)
3. **About Us Page** - Mission, vision, our story, what makes us different, team section
4. **Contact Page** - Contact form with Google Sheets integration, contact info cards, FAQ accordion

### Key Features:
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern UI/UX with smooth animations
- ✅ Working navigation with mobile menu
- ✅ Google Sheets integration for forms (newsletter + contact)
- ✅ Portfolio filtering functionality
- ✅ FAQ accordion
- ✅ SEO-optimized meta tags
- ✅ Smooth scrolling and animations
- ✅ Hover effects and transitions
- ✅ Custom scrollbar styling
- ✅ Accessibility features

## 🚀 Getting Started

### 1. Open the Website
Simply open `index.html` in your web browser to view the website locally.

### 2. Customize Content
- Replace placeholder text with your actual content
- Add your own images to the `assets/` folder
- Update contact information (email, phone, address)
- Modify colors in the CSS if needed

### 3. Configure Google Sheets Integration (Optional)

To enable form submissions to Google Sheets:

#### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Editkaro Form Submissions"
3. Create two sheets (tabs):
   - **Newsletter** - with columns: `Timestamp`, `Email`, `Type`
   - **Contact** - with columns: `Timestamp`, `Name`, `Email`, `Phone`, `Service`, `Message`, `Type`

#### Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any default code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet;
    
    // Determine which sheet to use based on form type
    if (data.type === 'newsletter') {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Newsletter');
      sheet.appendRow([
        data.timestamp,
        data.email,
        data.type
      ]);
    } else if (data.type === 'contact') {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contact');
      sheet.appendRow([
        data.timestamp,
        data.name,
        data.email,
        data.phone,
        data.service,
        data.message,
        data.type
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'data': data
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### Step 3: Deploy the Script
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Form submission handler"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

#### Step 4: Update JavaScript File
1. Open `js/script.js`
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual Web app URL
4. Save the file

#### Step 5: Test the Forms
1. Open your website
2. Try submitting the newsletter form on the home page
3. Try submitting the contact form on the contact page
4. Check your Google Sheet to see if the data appears

### Common Issues & Solutions

**Issue**: Forms show "Demo mode" message
- **Solution**: Make sure you've updated the `GOOGLE_SCRIPT_URL` in `js/script.js`

**Issue**: Data not appearing in Google Sheets
- **Solution**: 
  - Check that sheet names match exactly: "Newsletter" and "Contact"
  - Ensure the Apps Script is deployed as a "Web app" with "Anyone" access
  - Check the browser console for errors

**Issue**: CORS errors in console
- **Solution**: This is expected with `mode: 'no-cors'`. The data is still being sent successfully.

## 🎨 Customization Guide

### Colors
The site uses a purple/indigo gradient theme. To change colors:
1. Open `css/styles.css`
2. Find `.gradient-bg` and `.gradient-text` classes
3. Update the gradient colors

### Fonts
The site uses Google Font "Poppins". To change:
1. Open `css/styles.css`
2. Update the `@import` URL at the top
3. Change `font-family` in the `*` selector

### Logo
The site uses an SVG logo. To use your own:
1. Replace the favicon code in all HTML files
2. Or add your logo image to `assets/` and update the navigation section

### Images
1. Add your team photos, portfolio thumbnails, etc. to `assets/`
2. Update the `src` attributes in the HTML files
3. For best performance, optimize images before uploading

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom animations and styles
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)** - Interactivity and form handling
- **Google Apps Script** - Backend for form submissions
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📄 License

This project is provided as-is for Editkaro.in. Feel free to customize and use it for your business.

## 💡 Tips

- **Images**: Use optimized images (WebP format recommended) for better performance
- **SEO**: Update meta tags in each HTML file with your actual content
- **Analytics**: Add Google Analytics or similar tracking code before the closing `</body>` tag
- **Security**: If collecting sensitive data, consider using a backend service with proper security measures
- **Backup**: Regularly export your Google Sheets data as a backup

## 🆘 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all file paths are correct
3. Ensure JavaScript is enabled in the browser
4. Test forms in different browsers
5. Check Google Apps Script execution logs for backend issues

## 📞 Contact

For questions about this website:
- Email: hello@editkaro.in
- Phone: +91 98765 43210

---

**Built with ❤️ for Editkaro.in**

Last Updated: November 2024
