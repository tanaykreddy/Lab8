describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    await page.click('journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    const entry = await page.$eval('entry-page', (element) => {
      return element.entry;
    });
    expect(entry).toEqual({
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    });
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const className = await page.$eval('body', (element) => {
      return element.className;
    });
    expect(className).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    await page.click('header > img');
    expect(page.url()).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    const className = await page.$eval('body', (element) => {
      return element.className;
    });
    expect(className).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Journal Entries');
  });

  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {
    const className = await page.$eval('body', (element) => {
      return element.className;
    });
    expect(className).toBe('');
  });

  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.click('journal-entry + journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry2');
  });

  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Entry 2');
  });

  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const entry = await page.$eval('entry-page', (element) => {
      return element.entry;
    });
    expect(entry).toEqual({
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    });
  }, 10000);

  it('Test17: Verify the url is correct when clicking on the third entry', async () => {
    await page.goBack();
    await page.click('journal-entry + journal-entry + journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry3');
  });

  it('Test18: Verify the title is current when clicking on the third entry', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Entry 3');
  });

  it('Test19: Verify the url is correct when clicking on the fourth entry', async () => {
    await page.goBack();
    await page.click('journal-entry + journal-entry + journal-entry + journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry4');
  });

  it('Test20: Verify the title is current when clicking on the fourth entry', async () => {
    const title = await page.$eval('h1', (element) => {
      return element.innerHTML;
    });
    expect(title).toBe('Entry 4');
  });
});
