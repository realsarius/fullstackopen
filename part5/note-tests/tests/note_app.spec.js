const {test, describe, expect, beforeEach} = require('@playwright/test')
const {loginWith, createNote} = require("./helper");

describe('Note app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('front page can be opened', async ({page}) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
    })

    test('login form can be opened', async ({page}) => {
        await page.getByRole('button', {name: 'login'}).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')

        await page.getByRole('button', {name: 'login'}).click()

        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({page}) => {
        await page.getByRole('button', {name: 'login'}).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', {name: 'login'}).click()

        const errorDiv = await page.locator(".alert");
        await expect(errorDiv).toHaveCSS("align-content", "flex-start")
        await expect(page.getByText('wrong credentials')).toBeVisible()

        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

    test('user can log in', async ({page}) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new note can be created', async ({page}) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({page}) => {
                await createNote(page, 'another note by playwright')
            });

            test('importance can be toggled', async ({page}) => {
                await page.getByRole('button', {name: 'make important'}).click();
                await expect(page.getByRole('button', {name: 'make not important'})).toBeVisible();

            });
        });

        describe('and a note exists', () => {
            beforeEach(async ({page}) => {
                await createNote(page, 'first note', true)
                await createNote(page, 'second note', true)
                await createNote(page, 'third note', true)
            })

            test('one of those can be made nonimportant', async ({page}) => {
                await page.pause()
                const otherNoteText = await page.getByText('second note')
                const otherNoteElement = await otherNoteText.locator('..')

                await otherNoteElement.getByRole('button', {name: 'make important'}).click()
                await expect(otherNoteElement.getByText('make not important')).toBeVisible()
            })
        })
    });


})
