import React, { useState } from 'react';

function Ethform() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Numbers: ${num1}, ${num2}, ${num3}`);
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setNum3('');
  };

  return (
    <form className="max-w-[360px] mx-auto" onSubmit={handleSubmit}>
      <label className="block font-bold mb-2" htmlFor="num1">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          ETH Price:
        </h4>
        <input
          id="num1"
          className="form-input mt-1 block w-full text-3xl font-bold bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
          type="number"
          value={num1}
          placeholder="add price"
          onChange={(e) => setNum1(e.target.value)}
        />
      </label>
      <br />
      <label className="block font-bold mb-2" htmlFor="num2">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          Time Duration:
        </h4>
        <input
          id="num2"
          className="form-input mt-1 block w-full text-3xl font-bold bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
          type="number"
          value={num2}
          placeholder="Timing"
          onChange={(e) => setNum2(e.target.value)}
        />
      </label>
      <br />
      <label className="block font-bold mb-2" htmlFor="num3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          Portfolio Size:
        </h4>
        <input
          id="num3"
          className="form-input mt-1 block w-full text-3xl font-bold bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
          type="number"
          value={num3}
          placeholder="input size"
          onChange={(e) => setNum3(e.target.value)}
        />
      </label>
      <br />
      <div className="flex flex-col mt-2">
        <button
          type="submit"
          className={`py-4 px-6
    bg-blue-gradient font-poppins font-medium text-[15px] text-primary outline-none rounded-[10px]`}
        >
          Create Policy
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`py-4 px-6 mt-3
    bg-blue-gradient font-poppins font-medium text-[15px] text-primary outline-none rounded-[10px]`}
        >
          Claim Settlement
        </button>
      </div>
    </form>
  );
}

export default Ethform;
