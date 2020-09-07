import React, { Fragment } from "react";
import moment from "moment";
export default ({ items }) => {
  return (
    <Fragment>
      <div className="comments--container">
        <div class="comments-container">
          <h1>Live Comments</h1>
          <ul id="comments-list" class="comments-list">
            {[...items].map(({ snippet = {}, authorDetails = {} }, i) => {
              if (!snippet || !authorDetails) return <Fragment />;
              const { publishedAt, displayMessage } = snippet;
              const { displayName, isChatOwner, profileImageUrl } = authorDetails;
              return (
                <Fragment>
                  <li>
                    <div class="comment-main-level">
                      <div class="comment-avatar">
                        <img src={profileImageUrl} alt={displayName} />
                      </div>
                      <div class="comment-box">
                        <div class="comment-head">
                          <h6 class={`comment-name ${isChatOwner ? `by-author` : ""}`}>
                            <a href="#!">{displayName || "Default-Text"}</a>
                          </h6>
                          {publishedAt && <span>{moment(publishedAt).format("DD-MM-YYYY HH:mm:ss A")}</span>}
                          <i class="fa fa-reply"></i>
                          <i class="fa fa-heart"></i>
                        </div>
                        {displayMessage && <div class="comment-content">{displayMessage}</div>}
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
