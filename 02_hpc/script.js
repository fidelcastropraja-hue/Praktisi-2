const $ = s => document.querySelector(s);
$("#run").addEventListener("click",()=>{
  const n = Math.max(100,Math.min(50000,Number($("#count").value)||100));
  const data = Array.from({length:n},(_,i)=>(i*17%73)+Math.sin(i)*10);
  let t0=performance.now(), total=0;
  for(let i=0;i<data.length;i++) total += Math.sqrt(Math.abs(data[i]))*Math.log1p(i+1);
  const seq=performance.now()-t0;
  // Simulasi paralel: data dibagi menjadi empat bagian dan hasil parsial dihitung.
  t0=performance.now();
  const size=Math.ceil(data.length/4); let parallelTotal=0;
  for(let part=0;part<4;part++){
    let partial=0;
    for(let i=part*size;i<Math.min((part+1)*size,data.length);i++) partial+=Math.sqrt(Math.abs(data[i]))*Math.log1p(i+1);
    parallelTotal+=partial;
  }
  const par=performance.now()-t0;
  $("#seq").textContent=seq.toFixed(2)+" ms";
  $("#par").textContent=par.toFixed(2)+" ms";
  $("#summary").textContent=`Data diproses: ${n.toLocaleString("id-ID")}. Selisih hasil: ${Math.abs(total-parallelTotal).toExponential(2)}. Ini pembagian tugas simulasi dalam satu thread browser, bukan paralel CPU sesungguhnya.`;
});
