onmessage = (e) => {
    console.log("Message received from main script data " + JSON.stringify(e.data));
    let parentDiv = e.data['parentDiv'];
    let msgType = e.data['msgType'];
    let msg = e.data['msg'];
    let msgIcon = e.data['msgIcon'];
    let msgClass = e.data['msgClass'];
    $(parentDiv + ' .msgType').text(msgType);
    $(parentDiv + ' .msgContent').text(msg);
    // $(parentDiv + ' .msgIcon').text(msgIcon);
    $(parentDiv + ' .msgIcon').removeClass('msgIcon-success');
    $(parentDiv + ' .msgIcon').removeClass('msgIcon-warning');
    $(parentDiv + ' .msgIcon').removeClass('msgIcon-error');
    $(parentDiv + ' .msgIcon').addClass(msgIcon);
    $(parentDiv).addClass(msgClass);
};