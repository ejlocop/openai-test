const $form = document.querySelector('#form')
const $promptKey = $form.querySelector('#prompt')
const openAiURL = "https://api.openai.com/v1/completions"
const openAIApiKey = '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'
const $output = $form.querySelector('#output')
$form.addEventListener('submit', async (e) => {
	e.preventDefault()

	const form = {
		'prompt': $promptKey.value,
	}

	const response = await sendRequest(form)
	const data = await response.json()
	console.log(data)
	let output = $promptKey.value + "\n"
	for(let choice of data.choices) {
		output += "\n * " + choice.text.replace(/\n/g, '')
	}
	$output.textContent = output
})

const sendRequest = formData => {
	const config = {
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 2048,
		n: 5
	}
	const data = Object.assign({}, config, formData)
	return fetch(openAiURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${openAIApiKey}`,
		},
		body: JSON.stringify(data)
	})
}