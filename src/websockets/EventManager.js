class EventManager{
    constructor() {
        this.subscribers={}
    }
    subscribe(name, subscriber){
        this.subscribers[name]=subscriber;
    }
    unsubscribe(name){
        this.subscribers=null;
    }
    notify(subscriber, data){
        this.subscribers[subscriber](data);
    }
}export default EventManager;