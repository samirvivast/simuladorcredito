document.getElementById('creditForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const monto = parseFloat(document.getElementById('monto').value);
  const tasaAnual = parseFloat(document.getElementById('tasa').value);
  const meses = parseInt(document.getElementById('meses').value);

  const tasaMensual = tasaAnual / 12 / 100;
  const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

  let resultado = `<p>Cuota mensual aproximada: <strong>$${cuota.toFixed(2)}</strong></p>`;
  document.getElementById('resultado').innerHTML = resultado;

  generarTablaAmortizacion(monto, tasaMensual, meses, cuota);
});

function generarTablaAmortizacion(monto, tasaMensual, meses, cuota) {
  let saldo = monto;
  let tabla = `
    <h3>Tabla de Amortización</h3>
    <table>
      <tr>
        <th>Mes</th>
        <th>Interés</th>
        <th>Amortización</th>
        <th>Saldo</th>
      </tr>
  `;

  for (let i = 1; i <= meses; i++) {
    const interes = saldo * tasaMensual;
    const amortizacion = cuota - interes;
    saldo -= amortizacion;

    tabla += `
      <tr>
        <td>${i}</td>
        <td>$${interes.toFixed(2)}</td>
        <td>$${amortizacion.toFixed(2)}</td>
        <td>$${saldo > 0 ? saldo.toFixed(2) : "0.00"}</td>
      </tr>
    `;
  }

  tabla += `</table>`;
  document.getElementById('tablaAmortizacion').innerHTML = tabla;
}