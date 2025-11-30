# 📝 GOOGLE SHEETS INTEGRATION SETUP GUIDE

## 🎯 Complete Step-by-Step Setup

This guide will help you connect your website forms (Newsletter + Contact) to Google Sheets automatically.

---

## ⭐ STEP 1: CREATE GOOGLE SHEET

1. Go to **https://sheets.google.com**
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Editkaro Form Submissions"**

---

## ⭐ STEP 2: SET UP TWO SHEETS

### Sheet 1: Newsletter Submissions

1. At the bottom, you'll see "Sheet1" - rename it to **"Newsletter"**
2. In row 1, add these headers:

| Column A | Column B | Column C |
|----------|----------|----------|
| Timestamp | Email | Type |

### Sheet 2: Contact Submissions

1. Click the **"+"** button at the bottom to add a new sheet
2. Rename it to **"Contact"**
3. In row 1, add these headers:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | Name | Email | Phone | Service | Message | Type |

---

## ⭐ STEP 3: CREATE APPS SCRIPT

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. **Copy and paste this EXACT code:**

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;
    
    // Route to correct sheet based on form type
    if (data.type === 'newsletter') {
      sheet = ss.getSheetByName('Newsletter');
      
      // Add row to Newsletter sheet
      sheet.appendRow([
        data.timestamp,
        data.email,
        data.type
      ]);
      
    } else if (data.type === 'contact') {
      sheet = ss.getSheetByName('Contact');
      
      // Add row to Contact sheet
      sheet.appendRow([
        data.timestamp,
        data.name,
        data.email,
        data.phone,
        data.service || 'Not specified',
        data.message,
        data.type
      ]);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully',
      'data': data
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for debugging)
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        type: 'newsletter',
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click **"Save"** (💾 icon) or press `Ctrl+S`
5. Name your project: **"Form Handler"**

---

## ⭐ STEP 4: DEPLOY THE SCRIPT

1. Click **"Deploy"** → **"New deployment"**
2. Click the **gear icon ⚙️** next to "Select type"
3. Choose **"Web app"**
4. Configure settings:
   - **Description:** `Form submission handler`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **"Deploy"**
6. Click **"Authorize access"**
7. Choose your Google account
8. Click **"Advanced"** (if you see a warning)
9. Click **"Go to Form Handler (unsafe)"** (it's safe, it's your own script)
10. Click **"Allow"**

---

## ⭐ STEP 5: COPY THE WEB APP URL

After deployment, you'll see a **Web app URL** like:

```
https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXX/exec
```

**⚠️ COPY THIS ENTIRE URL!** You'll need it in the next step.

---

## ⭐ STEP 6: UPDATE YOUR WEBSITE CODE

1. Open your project folder: `C:\Users\ravi kumar\Desktop\Editkaro.in`
2. Open the file: `js/script.js`
3. Find **line 7** which says:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
4. Replace it with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXXXXX/exec';
   ```
5. **Save the file** (`Ctrl+S`)

---

## ⭐ STEP 7: PUSH CHANGES TO GITHUB

Open PowerShell in your project folder and run:

```powershell
git add js/script.js
git commit -m "Add Google Sheets integration"
git push
```

---

## ⭐ STEP 8: TEST THE FORMS

Wait 2-3 minutes for GitHub Pages to update, then:

1. Go to your website
2. Try the **Newsletter form** on the home page
3. Try the **Contact form** on the contact page
4. Check your Google Sheet - data should appear!

---

## 📊 WHAT YOUR GOOGLE SHEET WILL LOOK LIKE

### Newsletter Sheet:
| Timestamp | Email | Type |
|-----------|-------|------|
| 2024-11-30T10:30:00.000Z | user@example.com | newsletter |
| 2024-11-30T11:45:00.000Z | another@example.com | newsletter |

### Contact Sheet:
| Timestamp | Name | Email | Phone | Service | Message | Type |
|-----------|------|-------|-------|---------|---------|------|
| 2024-11-30T12:00:00.000Z | John Doe | john@example.com | +91 98765... | Video Editing | I need help... | contact |

---

## 🔧 TROUBLESHOOTING

### ❌ "Permission denied" error
**Solution:** Re-deploy and make sure "Who has access" is set to **"Anyone"**

### ❌ Data not appearing in sheet
**Solution:** 
- Check sheet names are exactly "Newsletter" and "Contact" (case-sensitive)
- Check column headers match exactly
- View Apps Script logs: **Extensions → Apps Script → Executions**

### ❌ CORS errors in browser console
**Solution:** This is normal! The form still works. We use `mode: 'no-cors'` which causes this warning but data still saves.

### ❌ Form says "Demo mode"
**Solution:** You haven't updated the `GOOGLE_SCRIPT_URL` in `js/script.js` yet

---

## ✅ VERIFICATION CHECKLIST

Before testing:
- ☐ Google Sheet created with "Newsletter" and "Contact" sheets
- ☐ Column headers added to both sheets
- ☐ Apps Script code pasted and saved
- ☐ Web app deployed with "Anyone" access
- ☐ Web app URL copied
- ☐ `js/script.js` updated with your URL
- ☐ Changes committed and pushed to GitHub
- ☐ Waited 2-3 minutes for deployment

---

## 📧 EMAIL NOTIFICATIONS (OPTIONAL)

Want to get email notifications when someone submits a form?

Add this to your Apps Script (after line 34):

```javascript
// Send email notification
MailApp.sendEmail({
  to: "your-email@gmail.com",
  subject: "New " + data.type + " submission",
  body: "New form submission received!\n\n" + JSON.stringify(data, null, 2)
});
```

---

## 🎉 YOU'RE DONE!

Your forms are now connected to Google Sheets! Every submission will automatically be saved.

**Questions?** Check the troubleshooting section above or review the Apps Script execution logs.

---

**Last Updated:** November 30, 2024
