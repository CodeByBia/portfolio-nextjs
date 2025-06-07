"use client";
import React, { useState } from "react";

function generateSecret() {
  let digits = [];
  while (digits.length < 4) {
    const n = Math.floor(Math.random() * 10);
    if (!digits.includes(n)) digits.push(n);
  }
  return digits.join("");
}

function getResult(guess, secret) {
  let bulls = 0, cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) bulls++;
    else if (secret.includes(guess[i])) cows++;
  }
  return { bulls, cows };
}

const MAX_ATTEMPTS = 10;

export default function SenhaGame() {
  const [secret, setSecret] = useState(generateSecret());
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    setInput(val);
  };

  const handleTry = (e) => {
    e.preventDefault();
    if (input.length !== 4 || new Set(input).size !== 4) {
      setMessage("Digite 4 dígitos únicos.");
      return;
    }
    const result = getResult(input, secret);
    const newAttempts = [
      { guess: input, ...result },
      ...attempts,
    ];
    setAttempts(newAttempts);
    setInput("");
    setMessage("");
    if (result.bulls === 4) {
      setFinished(true);
      setMessage("Parabéns! Você acertou a senha!");
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setFinished(true);
      setMessage("Fim de jogo! Você usou todas as tentativas.");
    }
  };

  const handleShowSecret = () => {
    alert(`A senha secreta é: ${secret}`);
  };

  const handleNewGame = () => {
    setSecret(generateSecret());
    setAttempts([]);
    setInput("");
    setFinished(false);
    setMessage("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212] px-4 py-8">
      <section className="w-full max-w-lg bg-[#181818] rounded-2xl shadow-lg border border-[#33353F] p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">Jogo da Senha</h1>
        <p className="mb-4 text-[#ADB7BE] text-center">Descubra a senha de 4 dígitos únicos. Você tem 10 tentativas!</p>
        <button onClick={handleShowSecret} className="mb-4 px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 text-xs text-white border border-blue-900 transition">Mostrar senha secreta</button>
        <form onSubmit={handleTry} className="flex gap-2 mb-4 w-full justify-center">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            disabled={finished}
            maxLength={4}
            className="w-24 px-3 py-2 rounded-lg text-white bg-[#222] border border-[#33353F] focus:outline-none focus:ring-2 focus:ring-blue-700 text-center text-xl tracking-widest placeholder:text-[#444]"
            placeholder="0000"
          />
          <button
            type="submit"
            disabled={finished}
            className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 text-white font-semibold border border-green-900 transition disabled:opacity-60"
          >
            Tentar
          </button>
          {finished && (
            <button
              type="button"
              onClick={handleNewGame}
              className="px-4 py-2 bg-yellow-700 rounded-lg hover:bg-yellow-800 text-white font-semibold border border-yellow-900 ml-2 transition"
            >
              Novo Jogo
            </button>
          )}
        </form>
        {message && <div className="mb-4 text-yellow-400 text-center font-medium">{message}</div>}
        <ul className="w-full space-y-2 mt-2">
          {attempts.map((a, idx) => (
            <li key={idx} className="flex justify-between items-center bg-[#222] rounded-lg px-4 py-2 border border-[#33353F] text-[#ADB7BE]">
              <span className="font-mono text-lg">{a.guess}</span>
              <span className="text-sm">Bulls: <span className="text-green-400 font-bold">{a.bulls}</span> | Cows: <span className="text-blue-400 font-bold">{a.cows}</span></span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
