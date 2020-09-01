import React, { Fragment, useState } from "react";
import Comments from "../../components/Comments";
import { getLiveChatId, fetchChatMessages } from "../../api";
import "./style.scss";

function Home() {
  const [tags, setTags] = useState({});
  const [streamUrl, setStreamUrl] = useState(null);
  const [tag, setTag] = useState(null);
  const [resp, setResp] = useState([]);
  const [inprogress, setInProgress] = useState(false);
  const inputRef = React.createRef();
  const onSubmit = async () => {
    setInProgress(true);
    const id = await getLiveChatId(streamUrl);
    await fetchChatMessages(null, id, items => setResp(state => [...state, ...items]), tags);
    setInProgress(false);
  };
  return resp && resp.length > 0 ? (
    <Fragment>
      <Comments items={[...resp]} />
      <div class="select">
        <button type="submit" onClick={() => window.location.reload()}>
          Un-Subscribe
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <h1>Enter Stream URL</h1>
      <div class="select">
        <input type="text" name="streamUrl" defaultValue={streamUrl} onChange={e => (e && e.target && e.target.value ? setStreamUrl(e.target.value) : null)} />
      </div>
      <br />
      <h1>Enter Tags</h1>
      <div class="select">
        <input
          type="text"
          name="tags"
          ref={inputRef}
          defaultValue={tag}
          onChange={e => (e && e.target && e.target.value ? setTag(e.target.value) : null)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              tag && setTags(state => ({...state, [tag]: true}));
              inputRef.current.value = null;
              setTag(null);
            }
          }}
          disabled={tags && tags.length >= 10 ? true : false}
        />
        <div id="tags">
          {tags && Object.keys(tags).length > 0 && (
            <ol>
              {Object.keys(tags).map(tag => (
                <li key={tag}>
                  <h2>{tag}</h2>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <br />
      <div class="select">
        <button type="submit" disabled={(tags && Object.keys(tags).length <= 0) || !streamUrl || inprogress ? true : false} onClick={onSubmit}>
          Subscribe
        </button>
      </div>
    </Fragment>
  );
}
export default Home;
