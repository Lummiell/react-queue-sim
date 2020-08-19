import React, { useState } from "react";
import "./App.css";

function App() {
  const [attendingNP, setAttendingNP] = useState<string>();
  const [attendingP, setAttendingP] = useState<string>();
  const [priorityQueue, setPriorityQueue] = useState<string[]>([]);
  const [nonPriorityQueue, setNonPriorityQueue] = useState<string[]>([]);
  const [nextIDNP, setNextIDNP] = useState<number>(0);
  const [nextIDP, setNextIDP] = useState<number>(0);
  function Peek(priority: boolean): string {
    if (priority) {
      if (priorityQueue.length === 0) {
        if (nonPriorityQueue.length === 0) {
          return "N/A";
        } else {
          return nonPriorityQueue[0];
        }
      } else {
        return priorityQueue[0];
      }
    } else {
      if (nonPriorityQueue.length === 0) {
        if (priorityQueue.length === 0) {
          return "N/A";
        } else {
          return priorityQueue[0];
        }
      } else {
        return nonPriorityQueue[0];
      }
    }
  }
  function NewTicket(priority: boolean) {
    if (priority) {
      priorityQueue.push(`CXP-${nextIDP}`);
      setNextIDP(nextIDP + 1);
      console.log(priorityQueue);
    } else {
      nonPriorityQueue.push(`CXN-${nextIDNP}`);
      setNextIDNP(nextIDNP + 1);
    }
  }
  function Dequeue(priority: boolean) {
    if (priority) {
      if (priorityQueue.length === 0) {
        if (nonPriorityQueue.length === 0) {
          alert("Filas vazias!");
        } else {
          setAttendingP(nonPriorityQueue.shift());
        }
      } else {
        setAttendingP(priorityQueue.shift());
      }
    } else {
      if (nonPriorityQueue.length === 0) {
        if (priorityQueue.length === 0) {
          alert("Filas vazias!");
        } else {
          setAttendingNP(priorityQueue.shift());
        }
      } else {
        setAttendingNP(nonPriorityQueue.shift());
      }
    }
  }
  return (
    <>
      <h1>Simulador de fila de banco</h1>
      <div className="cashierContainer">
        <div className="cashier">
          <h2>Caixa Não-Prioritário</h2>
          <p>Atendendo:{attendingNP || "N/A"}</p>
          <p>Próximo:{Peek(false)}</p>
          <button onClick={()=>{Dequeue(false)}}>Chamar</button>
        </div>
        <div className="cashier">
          <h2>Caixa Prioritário</h2>
          <p>Atendendo:{attendingP || "N/A"}</p>
          <p>Próximo:{Peek(true)}</p>
          <button onClick={()=>{Dequeue(true)}}>Chamar</button>
        </div>
      </div>
      <div className="newTicketContainer">
        <h3>Nova senha:</h3>
        <button
          className="primary"
          onClick={() => {
            NewTicket(false);
          }}
        >
          Não-Prioritária
        </button>
        <button
          className="secondary"
          onClick={() => {
            NewTicket(true);
          }}
        >
          Prioritária
        </button>
      </div>
      <div className="queuesContainer">
        <div className="queueContent">
          <h3>Fila não-prioritária:</h3>
          <div className="queue">
            {nonPriorityQueue.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div className="queueContent">
          <h3>Fila prioritária:</h3>
          <div className="queue">
            {priorityQueue.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
