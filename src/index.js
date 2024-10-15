const player1 = {
	nome: "Mario",
	velocidade: 4,
	manobrabilidade: 3,
	poder: 3,
	pontos: 0,
};

const player2 = {
	nome: "Luigi",
	velocidade: 3,
	manobrabilidade: 4,
	poder: 4,
	pontos: 0,
};

async function rollDice() {
	return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
	const random = Math.random();
	let result;
	switch (true) {
		case random < 0.33:
			result = "Reta";
			break;

		case random < 0.66:
			result = "Curva";
			break;

		default:
			result = "Confronto";
	}

	return result;
}

async function logRollResult(characterName, block, diceResult, atribute) {
	console.log(
		`${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`,
	);
}

async function playRaceEngine(character1, character2) {
	for (let round = 1; round <= 5; round++) {
		console.log(`🏁 Rodada ${round}`);

		// sortear Bloco
		// biome-ignore lint/style/useConst: <explanation>
		let block = await getRandomBlock();
		console.log(`Bloco: ${block}`);

		// rolar Dados
		// biome-ignore lint/style/useConst: <explanation>
		let diceResult1 = await rollDice();
		// biome-ignore lint/style/useConst: <explanation>
		let diceResult2 = await rollDice();

		//Teste de habilidade
		// biome-ignore lint/style/useConst: <explanation>
		let totalTestSkill1 = 0;
		// biome-ignore lint/style/useConst: <explanation>
		let totalTestSkill2 = 0;

		if (block === "Reta") {
			totalTestSkill1 = diceResult1 + character1.velocidade;
			totalTestSkill2 = diceResult2 + character2.velocidade;

			await logRollResult(
				character1.nome,
				"velocidade",
				diceResult1,
				character1.velocidade,
			);
			await logRollResult(
				character2.nome,
				"velocidade",
				diceResult2,
				character2.velocidade,
			);
		}

		if (block === "Curva") {
			totalTestSkill1 = diceResult1 + character1.manobrabilidade;
			totalTestSkill2 = diceResult2 + character2.manobrabilidade;

			await logRollResult(
				character1.nome,
				"manobrabilidade",
				diceResult1,
				character1.manobrabilidade,
			);
			await logRollResult(
				character2.nome,
				"manobrabilidade",
				diceResult2,
				character2.manobrabilidade,
			);

		}

		if (block === "Confronto") {
			// biome-ignore lint/style/useConst: <explanation>
			let powerResult1 = diceResult1 + character1.poder;
			// biome-ignore lint/style/useConst: <explanation>
			let powerResult2 = diceResult2 + character2.poder;

            console.log(`${ character1.nome } confrontou com ${ character2.nome } ! 🥊`)

            await logRollResult(
				character1.nome,
				"poder",
				diceResult1,
				character1.poder,
			);
			await logRollResult(
				character2.nome,
				"poder",
				diceResult2,
				character2.poder,
			);
			
			if (character2.pontos -= powerResult1 > powerResult2 && character2.pontos){
				console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto 🐢`)
				character2.pontos--
			}
				// character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1 : 0
            // if (powerResult1 > powerResult2){
            //     if (character2.pontos > 0){
            //         character2.pontos--
            //     } 
            // }
			
			if (character1.pontos -= powerResult2 > powerResult1 && character1.pontos){
				console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`)
				character1.pontos--
			}
				// character1.pontos -= powerResult2 > powerResult1 && character1.pontos > 0 ? 1 : 0
            // if (powerResult2 > powerResult1){
            //     if (character1.pontos > 0){
            //         character1.pontos--
            //     } 
            // }
			
				console.log( powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido" : "" )
            // if (powerResult1 === powerResult2){
            //     console.log("Confronto empatado! Nenhum ponto foi perdido")                 
            // }

		}

        if (totalTestSkill1 > totalTestSkill2){
            console.log(`${ character1.nome } marcou um ponto`)
            character1.pontos++
		}
		
		if (totalTestSkill2 > totalTestSkill1){
            console.log(`${ character2.nome } marcou um ponto`)
            character2.pontos++
        } 
		
		if (totalTestSkill2 === totalTestSkill1) {
			console.log(`Deu empate, ninguém pontua`)
		}
        console.log ("==============================================")
	}
}

async function declareWinner(character1, character2) {
	console.log("Resultado Final:")
	console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
	console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

	if (character1.pontos > character2.pontos)
		console.log(`\n ${character1.nome} venceu a corrida" Parabéns 🏆`)
	else if ( character2.pontos > character1.pontos)
		console.log(`\n ${character2.nome} venceu a corrida" Parabéns 🏆`)
	else
		console.log("A corrida terminou em empate")
}

(async function main() {
	console.log(
		`🏁🚨 Corrida ente ${player1.nome} e ${player2.nome} começando...\n`,
	);
	await playRaceEngine(player1, player2);
	await declareWinner(player1, player2);
})();

// console.log( rollDice() )
