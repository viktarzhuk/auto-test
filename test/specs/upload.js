const path = require('path');

describe('Upload file', () => {
    beforeEach(async () => {
        await browser.maximizeWindow()
    });
    
    it('Upload with choose file button visible',async () => {
        await browser.url('https://the-internet.herokuapp.com/upload');
        const filePath = path.join(__dirname, '../data/test_upload.jfif');
        const remoteFilePath = await browser.uploadFile(filePath);
        await $('#file-upload').setValue(remoteFilePath); 
        await $('#file-submit').click();
        await expect($('h3')).toHaveText('File Uploaded!')
    });
});