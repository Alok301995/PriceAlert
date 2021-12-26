import React from "react";

const HowToUse = () => {
  return (
    <div className="h-36">
      <ul className="list-disc p-1 max-h-full overflow-y-scroll scrollbar-hide xl:h-full">
        <li className="text-gray-200 pb-1 text-sm font-medium pr-5">
          1. Copy and paste the URL in the search bar and click on submit.
        </li>
        <li className="text-gray-200 pb-1 text-sm font-medium pr-5">
          2. Wait till the details of the product appear on your screen.
        </li>

        <li className="text-gray-200 pb-1 text-sm font-medium pr-5">
          3. Now set the target price to your desired amount and hit submit.
        </li>

        <li className="text-gray-200 pb-1 text-sm font-medium pr-5">
          4. Now go and relax, we will update you whenever the price reaches
          your desired amount, through mail on your registered e-mail.
        </li>
      </ul>
    </div>
  );
};

export default HowToUse;
