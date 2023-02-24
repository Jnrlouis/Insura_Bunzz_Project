import React, { useState } from 'react';

function NftAssetform() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Input 1: ${input1}`);
    console.log(`Input 2: ${input2}`);
  };

  return (
    <form className="max-w-[360px] mx-auto" onSubmit={handleSubmit}>
      <label className="block font-bold mb-2" htmlFor="input1">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          Contract Address:
        </h4>
      </label>
      <input
        type="text"
        className="form-input mt-1 block w-full text-3xl font-bold bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
        id="input1"
        name="input1"
        placeholder="paste contract address"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <br />
      <br />

      <label className="block font-bold mb-2" htmlFor="input2">
        {' '}
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          Token ID:
        </h4>
      </label>
      <input
        type="text"
        className="form-input mt-1 block w-full text-3xl font-bold bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
        id="input2"
        name="input2"
        placeholder="enter your tokenId"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <br />
      <br />

      <button
        type="submit"
        className={`py-4 px-6
          bg-blue-gradient font-poppins font-medium text-[15px] text-primary outline-none rounded-[10px]`}
      >
        Check Eligibility
      </button>
    </form>
  );
}

export default NftAssetform;
