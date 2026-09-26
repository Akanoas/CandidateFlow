export function Alert({message,type="danger"}){return message?<div className={`alert alert-${type}`} role="alert">{message}</div>:null;}
export function Loading({text="Loading…"}){return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"/><p className="text-muted mt-3 mb-0">{text}</p></div>;}
