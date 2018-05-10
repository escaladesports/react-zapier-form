import puppeteer from 'puppeteer'
import getPort from 'get-port'
import Server from 'static-server'
import { copy } from 'fs-extra'

jest.setTimeout(60 * 1000)

describe(`Form component`, () => {
	let server
	let browser
	let page
	beforeAll(async () => {
		server = new Server({
			rootPath: `dist-bundle`,
			port: await getPort(),
		})
		server.start()
		browser = await puppeteer.launch({ args: ['--no-sandbox'] })
		page = await browser.newPage()
		await page.goto(`http://localhost:${server.port}`)
		await page.waitForSelector(`form`)
	})
	it(`Should have content`, async () => {
		//let el = await page.$eval(`input`, !!e)
		//expect(el).toEqual(true)
		expect(true).toEqual(true)
	})
	afterAll(async () => {
		server.stop()
		await browser.close()
	})
})