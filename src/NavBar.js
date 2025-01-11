function NavBar() {
    return (
        <div className="d-flex justify-content-between">
            <a href="./" class="title">T-ester</a>
            <a href="./#Forum" className="btn-primary">
                <button type="button" class="btn btn-secondary">
                    Forum
                </button>
            </a>
        </div>
    )
}

export default NavBar;