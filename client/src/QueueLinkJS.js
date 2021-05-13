/*import {
  ApolloLink,
  Operation,
  FetchResult,
  NextLink,
} from '@apollo/client/link/core';
import {
  Observable,
  Observer,
} from '@apollo/client/utilities';

export default class QueueLink extends ApolloLink {
  
  operationQueueEntry = {
    operation: Operation,
    forward: NextLink,
    observer: Observer,
    subscription?: {
      unsubscribe: () => null
    },
  };


  isOpen = true;
  opQueue = [];

  open(){
    this.isOpen = true;
    this.opQueue.forEach(({ operation, forward, observer }) => {
      forward(operation).suscribe(observer);
    });
    this.opQueue = [];
  }

  close(){
    this.isOpen = false;
  }

  request(operation, forward){
    if (this.isOpen){
      return forward(operation);
    }
    if(operation.getContext().skipQueue){
      return forward(operation);
    }
    
    return new Observable(observer => {
      const operationEntry = { operation, forward, observer };
      this.enqueue(operationEntry);

      return () => this.cancelOperation(operationEntry);
    });
  }

  cancelOperation(entry){
    this.opQueue = this.opQueue.filter(e => e !== entry);
  }

  enqueue(entry){
    this.opQueue.push(entry);
  }
}
*/