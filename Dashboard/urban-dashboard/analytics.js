document.addEventListener("DOMContentLoaded", () => {

  // ===== DATA =====
  let labels = ["Jan", "Feb", "Mar", "Apr", "May"];
  let salesData = [120, 150, 180, 160, 200];
  let revenueData = [1.5, 2.1, 2.8, 3.0, 3.2];

  // ===== SALES CHART =====
  const salesChart = new Chart(
    document.getElementById("salesChart"),
    {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Monthly Sales",
          data: salesData,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false
      }
    }
  );

  // ===== REVENUE CHART =====
  const revenueChart = new Chart(
    document.getElementById("revenueChart"),
    {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Revenue (₹ Cr)",
          data: revenueData
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false
      }
    }
  );

  // ===== PROPERTY CHART =====
// ===== PROPERTY TYPE - PIE CHART =====
let propertyData = [26, 13, 20, 14]; // initial values

const propertyChart = new Chart(
  document.getElementById("propertyChart"),
  {
    type: "pie",
    data: {
      labels: ["1 BHK", "2 BHK", "Plots", "Commercial"],
      datasets: [{
        label: "Units Sold",
        data: propertyData,
        backgroundColor: [
          "#4facfe",
          "#43e97b",
          "#fbc531",
          "#ff7675"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false
    }
  }
);



  // ===== AUTO UPDATE EVERY 4 SECONDS =====
  setInterval(() => {

  // Line + Bar update
  labels.shift();
  salesData.shift();
  revenueData.shift();

  labels.push("M" + (labels.length + 1));
  salesData.push(Math.floor(Math.random() * 250));
  revenueData.push((Math.random() * 3 + 1).toFixed(2));

  salesChart.update();
  revenueChart.update();

  // Pie update
  propertyData[0] = Math.floor(Math.random() * 30) + 10;
  propertyData[1] = Math.floor(Math.random() * 25) + 5;
  propertyData[2] = Math.floor(Math.random() * 20) + 5;
  propertyData[3] = Math.floor(Math.random() * 15) + 5;

  propertyChart.update();

}, 4000);
}); 
