import React, { useState } from "react";
import { Button,Paper,Typography, Chip } from "@material-ui/core";
import './App.css'
function App() {
  const [attendingNP, setAttendingNP] = useState<string>();
  const [attendingP, setAttendingP] = useState<string>();
  const [priorityQueue, setPriorityQueue] = useState<string[]>([]);
  const [nonPriorityQueue, setNonPriorityQueue] = useState<string[]>([]);
  const [nextNonPriorityEnqueueID, setNextNonPriorityEnqueueID] = useState<
    number
  >(0);
  const [nextPriorityEnqueueID, setNextPriorityEnqueueID] = useState<number>(0);
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
  function Enqueue(priority: boolean) {
    if (priority) {
      priorityQueue.push(`CXP-${nextPriorityEnqueueID}`);
      setNextPriorityEnqueueID(nextPriorityEnqueueID + 1);
      console.log(priorityQueue);
    } else {
      nonPriorityQueue.push(`CXN-${nextNonPriorityEnqueueID}`);
      setNextNonPriorityEnqueueID(nextNonPriorityEnqueueID + 1);
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
        <Paper elevation={3} className='cashier'>
          <h2>Caixa 01</h2>
          <p>Atendendo:{attendingNP || "N/A"}</p>
          <p>Próximo:{Peek(false)}</p>
          <Button
          variant="contained"
          color="primary"
            onClick={() => {
              Dequeue(false);
            }}
          >
            Chamar
          </Button>
        </Paper>
        <Paper elevation={3} className='cashier'>
          <h2>Caixa 02 (Prioritário)</h2>
          <p>Atendendo:{attendingP || "N/A"}</p>
          <p>Próximo:{Peek(true)}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              Dequeue(true);
            }}
          >
            Chamar
          </Button>
        </Paper>
      </div>
      <div className="content">
        <div className="newTicketContainer">
          <h3>Nova senha:</h3>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              Enqueue(false);
            }}
          >
            Comum
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              Enqueue(true);
            }}
          >
            Prioritária
          </Button>
        </div>
        <div className="queuesContainer">
          <div className="queueContent">
            <h3>Fila Comum</h3>
            <div className="queue">
              {nonPriorityQueue.map((item) => (
                <Chip key={item} variant='outlined' label={item}/>
              ))}
            </div>
          </div>
          <div className="queueContent">
            <h3>Fila prioritária</h3>
            <div className="queue">
              {priorityQueue.map((item) => (
                <Chip key={item} variant='outlined' label={item}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
