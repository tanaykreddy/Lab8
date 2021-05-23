# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

    1 - Within a Github action that runs whenever code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

    No, because the "message" feature involves the interaction of two different users and their related components. The sending and receiving of a message also involve multiple moving parts.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

    Yes, because the "max message length" feature involves a single, isolated component. It can easily be tested by using message lengths of sizes less than, equal to, or greater than 80 characters.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

    If we run our puppeteer tests with the field "headless" set to true, then the browser UI will not be displayed during the process.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

    ```js
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        await page.click('header > img');
        await page.waitForTimeout(500);
    });
    ```

    

