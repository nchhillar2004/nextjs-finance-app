import React from "react";

function Loading() {
    return (
        <div className="container flex items-center justify-center h-full min-h-[50vh]">
            <div className="loader"></div>
        </div>
    );
}

function SmallLoading() {
    return (
        <div className="flex items-center justify-center h-fit w-fit">
            <div className="loader loader2"></div>
        </div>
    );
}

export { Loading, SmallLoading };
