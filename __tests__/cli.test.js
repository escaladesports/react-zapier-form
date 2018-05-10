import puppeteer from 'puppeteer'
import getPort from 'get-port'
import Server from 'static-server'
import { copy } from 'fs-extra'

jest.setTimeout(60 * 1000)

describe(`React component inject`, () => {
	let server
	let browser
	let page
	beforeAll(async () => {
		await copy(`./__tests__/inject.html`, `./dist-bundle/index.html`)
		server = new Server({
			rootPath: `dist-bundle`,
			port: await getPort(),
		})
		server.start()
		browser = await puppeteer.launch({ args: ['--no-sandbox'] })
		page = await browser.newPage()
		await page.goto(`http://localhost:${server.port}`)
		await page.waitForSelector(`.TestComponent`)
	})
	it(`Should have text content`, async () => {
		let text = await page.$eval(`.TestComponent`, e => e.textContent)
		expect(text.trim()).toEqual(`Test component.`)
	})
	it(`Should be red`, async () => {
		let color = await page.$eval(`.TestComponent`, e => window.getComputedStyle(e).color)
		expect(color).toEqual(`rgb(255, 0, 0)`)
	})
	afterAll(async () => {
		server.stop()
		await browser.close()
	})
})