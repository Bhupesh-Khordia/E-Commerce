import React from "react";

const NewsletterBox = () => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now and Get 20% Off !!
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe exclusive updates and special deals! 🎉 Be the first to know
        about new arrivals and enjoy 20% off your first purchase.
      </p>
      <form action="" onSubmit={handleFormSubmit} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your Email" required />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer">SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
