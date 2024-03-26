//importing various modules and libraries
import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Table
} from "react-bootstrap";
import "./App.css";
import ShowTable from "./ShowTable";

const App = () => {
  const option = useRef("");
  const timeQuantum = useRef("");
  const text = useRef("");
  const pnumber = useRef("");
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [numProcesses, setNumProcesses] = useState(0);
  const [processes, setProcesses] = useState([]);
  const [column, setColumn] = useState(false);
  const tmq = useRef(0);

  //3array for three columns
  const [process_id, Setpid] = useState([]);
  const [arrival_time, Setat] = useState([]);
  const [burst_time, Setbt] = useState([]);

  //For showing output to user
  const [processid,SetProcessid] = useState([]);
  const [processtime,SetProcesstime]=useState([]);
  const [output,SetOutput] = useState(false);

  //Content to be passed fot displaying table
  const [resultHead,setResultHead] = useState(["Process ID", "Arrival Time", "Burst Time", "Completion Time", "Turn Around Time", "Waiting Time"]);
  const [prid,Setprid] = useState([]);
  const [arrivaltime,Setarrivaltime] = useState([]);
  const [bursttime,Setbursttime] = useState([]);
  const [completionTime,Setct] = useState([]);
  const [turnAroundTime,Settt] = useState([]);
  const [waitingTime,Setwt] = useState([]);

  //For showing CPU utilization
  const [CPUtime,SetCputime] = useState(0);

  const handleAlgorithmChange = () => {
    if (option.current.value === "Round Robin (RR)") {
      timeQuantum.current.style.display = "block";
      text.current.style.display = "block";
    } else {
      timeQuantum.current.style.display = "none";
      text.current.style.display = "none";
    }
  };

  const handleAddProcessClick = () => {
    setIsHovered(true);
  };

  const handleModalSubmit = () => {
    const num = parseInt(pnumber.current.value);
    if (isNaN(num) || num <= 0) {
      setErrorMessage("*Please enter a valid number of processes.");
      return;
    }
    setNumProcesses(num);
    setProcesses(Array.from({ length: num }, (_, index) => index));

    let arr1 = new Array(num).fill(0);
    process_id.forEach((ele, i) => {
      if (ele !== 0 && ele !== -1) {
        // console.log(i);
        arr1[i] = ele;
      } else {
        arr1[i] = 0;
      }
    });

    let arr2 = new Array(num).fill(0);
    arrival_time.forEach((ele, i) => {
      if (ele !== 0 && ele !== -1) {
        arr2[i] = ele;
      } else {
        arr2[i] = 0;
      }
    });

    let arr3 = new Array(num).fill(0);
    burst_time.forEach((ele, i) => {
      if (ele !== 0 && ele!== -1) {
        arr3[i] = ele;
      } else {
        arr3[i] = 0;
      }
    });

    Setpid(arr1);
    Setat(arr2);
    Setbt(arr3);
    setIsHovered(false);
    setColumn(true);
    setErrorMessage("");
  };

  const deleteRow = (index) => {
    setProcesses((prevProcesses) => {
      const newProcesses = prevProcesses.filter((idx, i) => idx !== index);
      return newProcesses;
    });

    if (processes.length === 1) {
      Setpid([]);
      Setat([]);
      Setbt([]);
      setProcesses([]);
      setColumn(false);
    } else {
      let arr1 = new Array(processes.length - 1).fill(0);
      process_id.forEach((ele, i) => {
        if (i < index) {
          arr1[i] = ele;
        } else if (i === index) {
          arr1[i] = -1;
        } else {
          arr1[i] = ele;
        }
      });

      let arr2 = new Array(processes.length - 1).fill(0);
      arrival_time.forEach((ele, i) => {
        if (i < index) {
          arr2[i] = ele;
        } else if (i === index) {
          arr2[i] = -1;
        } else {
          arr2[i] = ele;
        }
      });

      let arr3 = new Array(processes.length - 1).fill(0);
      burst_time.forEach((ele, i) => {
        if (i < index) {
          arr3[i] = ele;
        } else if (i === index) {
          arr3[i] = -1;
        } else {
          arr3[i] = ele;
        }
      });
      Setpid(arr1);
      Setat(arr2);
      Setbt(arr3);
    }
  };

  const chkKey = (e) => {
    const keyCode = e.keyCode || e.which;

    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      e.preventDefault();
    }
  };

  const sortByat = (ar1, ar2, ar3) => {
    var n= ar1.length;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (ar2[j] > ar2[j + 1]) {
          var temp = ar2[j];
          ar2[j] = ar2[j + 1];
          ar2[j + 1] = temp;

          temp = ar3[j];
          ar3[j] = ar3[j + 1];
          ar3[j + 1] = temp;

          temp = ar1[j];
          ar1[j] = ar1[j + 1];
          ar1[j + 1] = temp;
        }
        else if (ar2[j] == ar2[j + 1] && ar1[j+1]<ar1[j]){
          var temp = ar2[j];
          ar2[j] = ar2[j + 1];
          ar2[j + 1] = temp;

          temp = ar3[j];
          ar3[j] = ar3[j + 1];
          ar3[j + 1] = temp;

          temp = ar1[j];
          ar1[j] = ar1[j + 1];
          ar1[j + 1] = temp;
        }
      }
    }
  };

  const sortByid = (ar1, ar2, ar3) => {
    var n= ar1.length;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (ar1[j] > ar1[j + 1]) {
          var temp = ar2[j];
          ar2[j] = ar2[j + 1];
          ar2[j + 1] = temp;

          temp = ar3[j];
          ar3[j] = ar3[j + 1];
          ar3[j + 1] = temp;

          temp = ar1[j];
          ar1[j] = ar1[j + 1];
          ar1[j + 1] = temp;
        }
      }
    }
  };

  const fcfs = (ar1, ar2, ar3) => {
    sortByat(ar1, ar2, ar3);
    const timestamp = new Array();
    const pr = new Array();

    timestamp.push(0);
    let n=ar2.length;
    for(let i=0;i<n;i++){
      if(timestamp[timestamp.length-1]>=ar2[i]){
        pr.push(ar1[i]);
        timestamp.push(timestamp[timestamp.length-1]+ar3[i]);
      }
      else {
        timestamp.push(ar2[i]);
        pr.push(-1);
        timestamp.push(ar2[i]+ar3[i]);
        pr.push(ar1[i]);
      }
    }
    SetProcessid(pr);
    SetProcesstime(timestamp);
    SetOutput(true);

    let cti=0;
    for(let i=0;i<pr.length;i++){
      if(pr[i]!==-1){
        cti+=(timestamp[i+1]-timestamp[i]);
      }
    }
    console.log(cti);
    let cpu_utilization = ((cti*100)/timestamp[timestamp.length-1]).toFixed(5)+"%";
    SetCputime(cpu_utilization);

    sortByid(ar1,ar2,ar3);
    Setprid(ar1);
    Setarrivaltime(ar2);
    Setbursttime(ar3);

    const ct = new Array();
    const tt = new Array();
    const wt = new Array();
    for(let i=0;i<ar1.length;i++){
        for(let j=0;j<pr.length;j++){
            if(ar1[i]===pr[j]){
                ct.push(timestamp[j+1]);
            }
        }
        tt.push(ct[i]-ar2[i]);
        wt.push(tt[i]-ar3[i]);
    }
    Setct(ct);
    Settt(tt);
    Setwt(wt);
  };

  const sjf = (ar1,ar2,ar3) => {
    sortByat(ar1, ar2, ar3);
    const timestamp = new Array();
    const pr = new Array();

    const ar11=new Array();
    const ar22=new Array();
    const ar33=new Array();

    for(let i=0;i<ar1.length;i++){
      ar11.push(ar1[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar22.push(ar2[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar33.push(ar3[i]);
    }

    timestamp.push(0);
    let n=ar2.length;
    for(let i=0;i<n;i++){
      let val=timestamp[timestamp.length-1];
      let proid=-1,art=1000000000,burt=10000000000;
      let ats=10000000000;
      let idx=-1;
      let j=0;
      while(j<n){
        if(ar22[j]<=val&&ar22[j]!=-1){
          if(ar33[j]<burt){
            proid=ar11[j];
            art=ar22[j];
            burt=ar33[j];
            idx=j;
          }
          else if(ar33[j]==burt){
            if(art>ar22[j]){
              proid=ar11[j];
              art=ar22[j];
              burt=ar33[j];
              idx=j;
            }
            else if(art==ar11[j]){
              if(prid>ar11[j]){
                proid=ar11[j];
                art=ar22[j];
                burt=ar33[j];
                idx=j;
              }
            }
          }
        }
        if(ar22[j]!=-1){
          if(ats>ar22[j]){
            ats=ar22[j];
          }
        }
        j++;
      }

      if(idx == -1){
        pr.push(-1);
        timestamp.push(ats);
        i--;
      }
      else {
        ar11[idx]=-1;
        ar22[idx]=-1;
        ar33[idx]=-1;
        pr.push(proid);
        timestamp.push(timestamp[timestamp.length-1]+burt);
      }
    }
    SetProcessid(pr);
    SetProcesstime(timestamp);
    SetOutput(true);

    let cti=0;
    for(let i=0;i<pr.length;i++){
      if(pr[i]!==-1){
        cti+=(timestamp[i+1]-timestamp[i]);
      }
    }
    let cpu_utilization = ((cti*100)/timestamp[timestamp.length-1]).toFixed(5)+"%";
    SetCputime(cpu_utilization);

    sortByid(ar1,ar2,ar3);
    Setprid(ar1);
    Setarrivaltime(ar2);
    Setbursttime(ar3);

    const ct = new Array();
    const tt = new Array();
    const wt = new Array();
    for(let i=0;i<ar1.length;i++){
        for(let j=0;j<pr.length;j++){
            if(ar1[i]===pr[j]){
                ct.push(timestamp[j+1]);
            }
        }
        tt.push(ct[i]-ar2[i]);
        wt.push(tt[i]-ar3[i]);
    }
    Setct(ct);
    Settt(tt);
    Setwt(wt);
  }

  const srtf = (ar1,ar2,ar3) => {
    sortByat(ar1,ar2,ar3);
    const timestamp = new Array();
    const pr = new Array();

    const ar11=new Array();
    const ar22=new Array();
    const ar33=new Array();

    for(let i=0;i<ar1.length;i++){
      ar11.push(ar1[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar22.push(ar2[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar33.push(ar3[i]);
    } 

    timestamp.push(0);

    while(true){
      const idxarr = new Array();
      let val=timestamp[timestamp.length-1];

      let flag=0;
      let at=100000000000;

      for(let i=0;i<ar11.length;i++){
        if(ar33[i]!=0){
          flag=1;
        }
        if(ar33[i]!=0&&ar22[i]<=val){
          idxarr.push(i);
        }
        else if(ar33[i]!=0){
          if(at>ar22[i]){
            at=ar22[i];
          }
        }
      }

      if(flag === 0){
        break;
      }
      if(idxarr.length === 0){
        pr.push(-1);
        timestamp.push(at);
        continue;
      }

      let prid=-1;
      let ariv_time=100000000000;
      let bur_time=1000000000000;
      let fid=-1;

      for(let i=0;i<idxarr.length;i++){
        let id=idxarr[i];
        if(bur_time>ar33[id]){
          prid=ar11[id];
          ariv_time=ar22[id];
          bur_time=ar33[id];
          fid=id
        }
        else if(bur_time === ar33[id]){
          if(ar22[id]<ariv_time){
            prid=ar11[id];
            ariv_time=ar22[id];
            bur_time=ar33[id];
            fid=id;
          }
          else if(ar22[id]==ariv_time){
            if(ar11[id]<prid){
              fid=id;
              prid=ar11[id];
              ariv_time=ar22[id];
              bur_time=ar33[id];
            }
          }
        }
      }
      
      pr.push(ar11[fid]);
      ar33[fid]--;
      timestamp.push(timestamp[timestamp.length-1]+1);

    }

    const newpr = new Array();
    const newtmp=new Array();

    newtmp.push(0);

    for(let i=0;i<pr.length;i++){
      if(pr[i]==-1){
        newpr.push(pr[i]);
        newtmp.push(timestamp[i+1]);
      }
      else {
        let j=i;
        newpr.push(pr[i]);
        let val=0;
        while(i<pr.length&&pr[j]===pr[i]){
          val=timestamp[i+1];
          i++;
        }
        i--;
        newtmp.push(val);
      }
    }


    SetProcessid(newpr);
    SetProcesstime(newtmp);
    SetOutput(true);

    let cti=0;
    for(let i=0;i<pr.length;i++){
      if(pr[i]!==-1){
        cti+=(timestamp[i+1]-timestamp[i]);
      }
    }
    let cpu_utilization = ((cti*100)/timestamp[timestamp.length-1]).toFixed(5)+"%";
    SetCputime(cpu_utilization);

    //for displaying table
    sortByid(ar1,ar2,ar3);
    Setprid(ar1);
    Setarrivaltime(ar2);
    Setbursttime(ar3);
    
    const ct = new Array();
    const tt = new Array();
    const wt = new Array();
    for(let i=0;i<ar1.length;i++){
        for(let j=0;j<newpr.length;j++){
            if(ar1[i]===newpr[j]){
                ct[i]=newtmp[j+1];
            }
        }
        tt.push(ct[i]-ar2[i]);
        wt.push(tt[i]-ar3[i]);
    }
    Setct(ct);
    Settt(tt);
    Setwt(wt);

  }

  const roundrobbin = (ar1,ar2,ar3) => {
    const time_quantum = Number(tmq.current.value);
    sortByat(ar1,ar2,ar3);

    const timestamp = [];
    const pr = [];

    const ar11=[];
    const ar22=[];
    const ar33=[];

    for(let i=0;i<ar1.length;i++){
      ar11.push(ar1[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar22.push(ar2[i]);
    }
    for(let i=0;i<ar1.length;i++){
      ar33.push(ar3[i]);
    }
    timestamp.push(0);
    const idxarr=[];
    const artime=[];
    let val=0;

    let flag=0;

    for(let i=0;i<ar11.length;i++){
      if(ar33[i]!==0){
        flag=1;
      }
      if(ar33[i]!=0&&ar22[i]<=val){
        idxarr.push(i);
        artime.push(ar11[i]);
      }
    }
    while(flag){
      if(idxarr.length === 0){
        pr.push(-1);
        let mntime=10000000000000;
        for(let i=0;i<ar22.length;i++){
            if(ar33[i]!==0&&!(artime.includes(ar11[i]))){
              if(mntime>ar22[i]){
                mntime=ar22[i];
              }
            }
        }
        timestamp.push(mntime);
        val=timestamp[timestamp.length-1];
        for(let i=0;i<ar22.length;i++){
          if(ar33[i]!=0&&ar22[i]<=val&& !(artime.includes(ar11[i]))){
            idxarr.push(i);
            artime.push(ar11[i]);
          }
        }
        // Check if there are any remaining processes
        for(let i=0;i<ar22.length;i++){
          if(ar33[i]!==0){
            flag=1;
            break;
          }
          else{
            flag=0;
          }
        }
        if(flag===0){
          break;
        }
        
        continue;
      }      
      pr.push(artime[0]);
      if(ar33[idxarr[0]]>=time_quantum){
        ar33[idxarr[0]]-=time_quantum;
        timestamp.push(timestamp[timestamp.length-1]+time_quantum);
      }
      else {
        let kk = timestamp.length > 0 ? timestamp[timestamp.length - 1] + ar33[idxarr[0]] : ar33[idxarr[0]];
        timestamp.push(kk);
        ar33[idxarr[0]] = 0;
      }
      val=timestamp[timestamp.length-1];
      for(let i=0;i<ar22.length;i++){
        if(ar33[i]!=0&&ar22[i]<=val&& !(artime.includes(ar11[i]))){
          idxarr.push(i);
          artime.push(ar11[i]);
        }
      }
      for(let i=0;i<ar22.length;i++){
        if(ar33[i]!==0){
          flag=1;
          break;
        }
        else {
          flag=0;
        }
      }
      if(flag===0){
        break;
      }
      if(ar33[idxarr[0]]>=1){
        idxarr.push(idxarr[0]);
        artime.push(ar11[idxarr[0]]);
      }

      for(let i=0;i<idxarr.length-1;i++){
        idxarr[i]=idxarr[i+1];
        artime[i]=artime[i+1];
      }
      idxarr.pop();
      artime.pop();
    }
    SetProcessid(pr);
    SetProcesstime(timestamp);
    SetOutput(true);

    let cti=0;
    for(let i=0;i<pr.length;i++){
      if(pr[i]!==-1){
        cti+=(timestamp[i+1]-timestamp[i]);
      }
    }
    let cpu_utilization = ((cti*100)/timestamp[timestamp.length-1]).toFixed(5)+"%";
    SetCputime(cpu_utilization);

    sortByid(ar1,ar2,ar3);
    Setprid(ar1);
    Setarrivaltime(ar2);
    Setbursttime(ar3);

    const ct = [];
    const tt = [];
    const wt = [];
    for(let i=0;i<ar1.length;i++){
        for(let j=0;j<pr.length;j++){
            if(ar1[i]===pr[j]){
                ct[i]=timestamp[j+1];
            }
        }
        tt.push(ct[i]-ar2[i]);
        wt.push(tt[i]-ar3[i]);
    }
    Setct(ct);
    Settt(tt);
    Setwt(wt);

  }

  const RunProcess = (e) => {
    e.preventDefault();
    const ar1 = new Array();
      process_id.forEach((val) => {
        if (val !== -1) {
          ar1.push(val);
        }
      });
      const ar2 = new Array();
      arrival_time.forEach((val) => {
        if (val !== -1) {
          ar2.push(val);
        }
      });
      const ar3 = new Array();
      burst_time.forEach((val) => {
        if (val !== -1) {
          ar3.push(val);
        }
      });
    if(ar1.length===0 || ar2.length===0 || ar3.length===0){
      alert("Please enter valid input and make sure that processes are added...");
      return;
    } 
    if (option.current.value === "First Come First Serve (FCFS)") {
      fcfs(ar1, ar2, ar3);
    } else if (option.current.value === "Shortest Job Next (SJN)") {
      sjf(ar1,ar2,ar3);
    } else if (option.current.value === "Round Robin (RR)") {
      //here it is in string
      if (tmq.current.value !== "") {
        roundrobbin(ar1,ar2,ar3);
      } else {
        alert("As you have selected RR, you must mention time quantum");
      }
    } else {
      srtf(ar1,ar2,ar3);
    }
  };

  function handleChange(e, index, name) {
    let newValue = parseInt(e.target.value !== "" ? e.target.value : "0");
    if (isNaN(newValue)) {
      return;
    }

    let newProcessId = [...process_id];
    let newArrivalTime = [...arrival_time];
    let newBurstTime = [...burst_time];

    if (name === "processId") {
      newProcessId[index] = newValue;
      Setpid(newProcessId);
    } else if (name === "arrivalTime") {
      newArrivalTime[index] = newValue;
      Setat(newArrivalTime);
    } else {
      newBurstTime[index] = newValue;
      Setbt(newBurstTime);
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          <h1>ScheduSim</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <p>Process Scheduling Algorithm Simulator</p>
        </Col>
      </Row>
      <Row className="mb-4 justify-content-center">
        <Col xs="auto">
          <Form.Label>Select an Algorithm:</Form.Label>
        </Col>
        <Col xs="auto">
          <Form.Select ref={option} onChange={handleAlgorithmChange} style={{cursor:"pointer"}}>
            <option>First Come First Serve (FCFS)</option>
            <option>Shortest Job Next (SJN)</option>
            <option>Round Robin (RR)</option>
            <option>Shortest Remaining Time First (SRTF)</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-4 justify-content-center">
        <Col xs="auto" ref={text} style={{ display: "none" }}>
          <Form.Label>Time Quantum:</Form.Label>
        </Col>
        <Col xs="auto" ref={timeQuantum} style={{ display: "none" }}>
          <Form.Control
            type="number"
            ref={tmq}
            min={1}
            max={100}
            style={{ width: "70px" }}
          />
        </Col>
      </Row>
      {processes.map((process, index) => (
        <div>
        {index === 0 && (
          <Row className="mb-2 justify-content-center">
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Process ID"
                style={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "16px", // Adjust the font size as needed
                  fontWeight: "bold", // Make the placeholder bold
                  paddingLeft:"15px"
                }}
                aria-label="Process ID"
                readOnly
                size={5}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Arrival Time"
                style={{
                  textAlign: "left",
                  border: "none",
                  fontSize: "16px", // Adjust the font size as needed
                  fontWeight: "bold", // Make the placeholder bold
                  paddingLeft:"40px"
                }}
                readOnly
                size={5}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Burst Time"
                style={{
                  textAlign: "left",
                  border: "none",
                  fontSize: "16px", // Adjust the font size as needed
                  fontWeight: "bold", // Make the placeholder bold
                }}
                readOnly
                size={5}
              />
            </InputGroup>
          </Col>
        </Row>
        )}
          <Row key={process} className="mb-2 justify-content-center">
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder=""
                value={
                  process_id[process] /*!== 0 ? `${process_id[process]}` : ""*/
                }
                style={{ textAlign: "center"}}
                aria-label="Process ID"
                onKeyDown={chkKey}
                size={5}
                onChange={(e) => handleChange(e, process, "processId")}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder=""
                value={
                  arrival_time[process] /*!== 0 ? `${arrival_time[process]}` : ""*/
                }
                style={{ textAlign: "center" }}
                aria-label="Arrival Time"
                onKeyDown={chkKey}
                onChange={(e) => handleChange(e, process, "arrivalTime")}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <InputGroup>
              <FormControl
                type="text"
                placeholder=""
                value={
                  burst_time[process] /*!== 0 ? `${burst_time[process]}` : ""*/
                }
                style={{ textAlign: "center" }}
                aria-label="Burst Time"
                onKeyDown={chkKey}
                onChange={(e) => handleChange(e, process, "burstTime")}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button variant="danger" onClick={() => deleteRow(process)}>
              X
            </Button>
          </Col>
        </Row>
      </div>
      ))}
      {isHovered && (
        <Modal show={true} onHide={() => setIsHovered(false)}>
          <Modal.Body>
            <Form.Group controlId="folderName">
              <Form.Label>Enter no. of processes you want to add:</Form.Label>
              <Form.Control type="number" ref={pnumber} />
              {errorMessage !== "" && (
                <p style={{ color: "red" }}>{errorMessage}</p>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setErrorMessage("");
                pnumber.current.value = 0;
                setIsHovered(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleModalSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddProcessClick}>
            Add Process
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            onClick={(e) => {
              RunProcess(e);
            }}
          >
            Run Process
          </Button>
        </Col>
      </Row>
      <hr style={{ border: "none", borderTop: "2px dotted black", width: "100%" }} />
      {output && (
        <Container className="mt-5" id="ganttchart">
          <h1 style={{ textAlign: 'center' }}>Gantt Chart</h1>
          <Table bordered id="ganttTable">
            <tbody>
              <tr style={{ textAlign: "center" }}>
                {processid.map((process, index) => (
                  <td key={index} style={{fontWeight:"bold"}}>{process === -1 ? "-" : `P${process}`}</td>
                ))}
              </tr>
              <tr id="timeline" style={{ border: "none" }}>
                {processtime.map((time, index) => (
                  <td key={index} style={{ border: "none",paddingLeft:"1px" }}>
                    {time}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Container>
      )}
      {output && <ShowTable resultHead={resultHead} processID={prid} arrivalTime={arrivaltime} burstTime={bursttime} completionTime={completionTime} turnAroundTime={turnAroundTime} waitingTime={waitingTime} CPUtime={CPUtime} />}
    </Container>
  );
};

export default App;