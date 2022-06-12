import React from "react";

const FlashMessage = ({ flashMessages }) => {
  return (
    <div className="floating-alerts">
      {flashMessages.map((el, index) => {
        return (
          <div
            key={index}
            className={
              "alert text-center floating-alert shadow-sm " +
              (el.status ? "alert--success" : "alert--error")
            }
          >
            {el.message}
          </div>
        );
      })}
    </div>
  );
};

export default FlashMessage;
