const { expect } = require('@playwright/test')
const { createBdd } = require('playwright-bdd')

const { Given, When, Then } = createBdd()

async function acceptCookiesIfShown(page) {
  const acceptButton = page.getByRole('button', { name: 'Aceitar todos' })
  if ((await acceptButton.count()) > 0 && (await acceptButton.isVisible())) {
    await acceptButton.click()
  }
}

async function openFilters(page) {
  const applyButton = page.getByTestId('apply-filters-btn')
  if (await applyButton.isVisible()) {
    return
  }

  await page.getByRole('button', { name: /Mais filtros|Todos os filtros/ }).click()
  await expect(applyButton).toBeVisible()
}

async function applyFilters(page) {
  await page.getByTestId('apply-filters-btn').click()
}

async function selectRadioOption(page, selector) {
  const option = page.locator(selector)
  await page.locator('label').filter({ has: option }).click()
  await expect(option).toBeChecked()
}

async function selectCheckboxOption(page, selector) {
  const option = page.locator(selector)
  await page.locator('label').filter({ has: option }).click()
  await expect(option).toBeChecked()
}

Given('que estou na página de busca de imóveis do Rio de Janeiro', async ({ page }) => {
  await page.goto('/comprar/imovel/rio-de-janeiro-rj-brasil')
  await acceptCookiesIfShown(page)
  await expect(page.locator('input[name="cockpit-location-input"]')).toBeVisible()
  await expect(page.locator('h1')).toContainText(/imóveis/i)
  await expect(page.locator('#cockpit-open-button')).toBeVisible()
})

When('pesquiso por {string}', async ({ page }, searchTerm) => {
  const locationInput = page.locator('input[name="cockpit-location-input"]')
  await locationInput.fill('')
  await locationInput.pressSequentially(searchTerm, { delay: 75 })
})

Then('o campo de localização deve conter {string}', async ({ page }, searchTerm) => {
  await expect(page.locator('input[name="cockpit-location-input"]')).toHaveValue(
    searchTerm,
  )
})

When(
  'seleciono a sugestão da Estrada do Engenho D Água no bairro Anil',
  async ({ page }) => {
    await page
      .getByRole('option', {
        name: /^Estrada do Engenho D.água - Anil/i,
      })
      .click()
  },
)

Then('devo ver os resultados dessa localização', async ({ page }) => {
  await expect(page).toHaveURL(
    /estr\.-do-engenho-dagua-anil-rio-de-janeiro-rj-brasil/,
  )
})

Then('posso abrir um imóvel e ver seus detalhes', async ({ page }) => {
  const propertyLink = page
    .locator('a[href^="/imovel/"]')
    .filter({ hasText: /Estrada do Engenho/i })
    .first()
  await expect(propertyLink).toBeVisible()

  const propertyPagePromise = page.waitForEvent('popup')
  await propertyLink.click()
  const propertyPage = await propertyPagePromise

  await expect(propertyPage).toHaveURL(/\/imovel\/\d+\//)
  await expect(propertyPage.locator('h1')).toHaveText(
    /Apartamento à venda com [1-9]\d*m², [1-9]\d* quartos/,
  )
})

When('escolho a opção de alugar', async ({ page }) => {
  await openFilters(page)
  await page.getByTestId('tab-rent').click()
  await applyFilters(page)
})

Then('vejo resultados de imóveis para alugar', async ({ page }) => {
  await expect(page).toHaveURL(/alugar/)
  await expect(page.locator('h1')).toContainText(/alugar/i)
})

When(
  'seleciono o tipo de imóvel {string} e aplico os filtros',
  async ({ page }, propertyType) => {
    await openFilters(page)
    await page.locator(`input[name="${propertyType}"]`).check()
    await applyFilters(page)
  },
)

Then(
  'o filtro {string} permanece aplicado aos resultados',
  async ({ page }, filterName) => {
    const removableFilter = {
      Piscina: 'Piscina, filtro, remover',
      Apartamento: 'Apartamento, filtro, remover',
    }[filterName]
    if (removableFilter) {
      await expect(page.getByRole('button', { name: removableFilter })).toBeVisible()
      return
    }

    const inputName = { Piscina: 'PISCINA', Apartamento: 'Apartamento' }[filterName]
    if (!inputName) {
      throw new Error(`Filtro não mapeado: ${filterName}`)
    }
    await openFilters(page)
    await expect(page.locator(`input[name="${inputName}"]`)).toBeChecked()
  },
)

When(
  'seleciono o filtro de pelo menos {string} quartos e aplico os filtros',
  async ({ page }, count) => {
    await openFilters(page)
    await selectRadioOption(page, `input[name="bedrooms"][value="${count}"]`)
    await applyFilters(page)
  },
)

Then(
  'o filtro de pelo menos {string} quartos permanece aplicado aos resultados',
  async ({ page }, count) => {
    await openFilters(page)
    await expect(
      page.locator(`input[name="bedrooms"][value="${count}"]`),
    ).toBeChecked()
  },
)

When(
  'seleciono o filtro de pelo menos {string} vaga e aplico os filtros',
  async ({ page }, count) => {
    await openFilters(page)
    await selectRadioOption(page, `input[name="parkingSpaces"][value="${count}"]`)
    await applyFilters(page)
  },
)

Then(
  'o filtro de pelo menos {string} vaga permanece aplicado aos resultados',
  async ({ page }, count) => {
    await openFilters(page)
    await expect(
      page.locator(`input[name="parkingSpaces"][value="${count}"]`),
    ).toBeChecked()
  },
)

When(
  'seleciono o filtro de pelo menos {string} banheiro e aplico os filtros',
  async ({ page }, count) => {
    await openFilters(page)
    await page.locator(`input[name="bathrooms"][value="${count}"]`).check()
    await applyFilters(page)
  },
)

Then(
  'o filtro de pelo menos {string} banheiro permanece aplicado aos resultados',
  async ({ page }, count) => {
    await openFilters(page)
    await expect(
      page.locator(`input[name="bathrooms"][value="${count}"]`),
    ).toBeChecked()
  },
)

When(
  'defino o valor máximo do imóvel como {string} reais e aplico os filtros',
  async ({ page }, amount) => {
    await openFilters(page)
    await page.locator('input[name="salePrice-max"]').fill(amount)
    await applyFilters(page)
  },
)

Then(
  'o valor máximo do imóvel de {string} reais permanece aplicado aos resultados',
  async ({ page }, amount) => {
    await openFilters(page)
    const displayedAmount = await page.locator('input[name="salePrice-max"]').inputValue()
    expect(displayedAmount.replace(/\D/g, '')).toBe(amount)
  },
)

When(
  'defino o valor máximo de condomínio e IPTU como {string} reais e aplico os filtros',
  async ({ page }, amount) => {
    await openFilters(page)
    await page.locator('input[name="condoIptu-max"]').fill(amount)
    await applyFilters(page)
  },
)

Then(
  'o valor máximo de condomínio e IPTU de {string} reais permanece aplicado aos resultados',
  async ({ page }, amount) => {
    await openFilters(page)
    const displayedAmount = await page.locator('input[name="condoIptu-max"]').inputValue()
    expect(displayedAmount.replace(/\D/g, '')).toBe(amount)
  },
)

When(
  'defino a área mínima como {string} metros quadrados e aplico os filtros',
  async ({ page }, area) => {
    await openFilters(page)
    await page.locator('input[name="area-min"]').fill(area)
    await applyFilters(page)
  },
)

Then(
  'a área mínima de {string} metros quadrados permanece aplicada aos resultados',
  async ({ page }, area) => {
    await openFilters(page)
    await expect(page.locator('input[name="area-min"]')).toHaveValue(area)
  },
)

When(
  'seleciono a comodidade {string} no condomínio e aplico os filtros',
  async ({ page }, amenity) => {
    const inputName = { Piscina: 'PISCINA' }[amenity]
    if (!inputName) {
      throw new Error(`Comodidade não mapeada: ${amenity}`)
    }
    await openFilters(page)
    await selectCheckboxOption(page, `input[name="${inputName}"]`)
    await applyFilters(page)
  },
)

When('aplico o filtro de apartamentos', async ({ page }) => {
  await openFilters(page)
  await page.locator('input[name="Apartamento"]').check()
  await applyFilters(page)
})

When('limpo os filtros selecionados', async ({ page }) => {
  await page
    .getByRole('button', { name: 'Apartamento, filtro, remover' })
    .click()
})

Then(
  'o filtro de apartamentos deixa de estar aplicado aos resultados',
  async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Apartamento, filtro, remover' }),
    ).toHaveCount(0)
  },
)
