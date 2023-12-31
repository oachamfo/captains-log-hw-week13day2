const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>
            <a href="/logs/">Captain's Logs Homepage</a>
          </h1>
        </nav>
        <h1>New Captain's Log page</h1>
        <form action="/logs" method="POST">
          Title:{" "}
          <input type="text" name="title" defaultValue="Captain's log title" />
          <br />
          Entry: <br></br>
          <textarea
            name="entry"
            rows="4"
            cols="50"
            defaultValue="Please type your Captain's log entry here."
          />
          <br />
          Ship is Broken: <input type="checkbox" name="shipIsBroken" />
          <br />
          <input type="submit" value="Create Log" />
        </form>
      </div>
    );
  }
}

module.exports = New;
