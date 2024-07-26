

document.addEventListener('DOMContentLoaded', function () {
    get();
});

function add() {
    // Input değerlerini al
    var engInputValue = document.getElementById("engInput").value;
    var trInputValue = document.getElementById("trInput").value;

    // AJAX isteği gönder
    $.ajax({
        url: '/Home/Add', // HomeController'daki Add metoduna istek
        type: 'POST', // POST yöntemi kullan
        data: {
            engWord: engInputValue, // İngilizce kelime verisi
            trWord: trInputValue  // Türkçe kelime verisi
        },
        success: function (response) {

            //// Başarılı bir yanıt alındığında inputları temizle
            //document.getElementById("engInput").value = "";
            //document.getElementById("trInput").value = "";
            window.location.reload();
        },
        error: function (xhr, status, error) {
            // Hata durumunda yapılacak işlemler
            alert('Bir hata oluştu: ' + error);
        }
    });
}

function get() {
    var engInput = document.getElementById('engInput');
    engInput.focus();
    $.ajax({
        url: '/Home/Get',
        type: 'GET',
        data: {},
        success: function (response) {
            const container = document.getElementById('articles-container');

            // Pastel renk listesi
            const pastelColors = [
                '#fef8e4', // Pastel Sarı
                '#f5d3b3', // Pastel Turuncu
                '#f6b6b6', // Pastel Kırmızı
                '#d9a7f3', // Pastel Mor
                '#a2c2e2', // Pastel Mavi
                '#a8e5a3'  // Pastel Yeşil
            ];

            // Pastel renk geçişleri oluşturma
            const gradients = pastelColors.map((color, index) => {
                const nextColor = pastelColors[(index + 1) % pastelColors.length];
                return `linear-gradient(135deg, ${color}, ${nextColor})`;
            });

            let gradientIndex = 0;

            response.forEach((item, index) => {
                // Her 6 öğede bir renk değişimi
                if (index % 6 === 0) {
                    gradientIndex = (gradientIndex + 1) % gradients.length;
                }

                const colDiv = document.createElement('div');
                colDiv.className = 'col-sm-2';

                colDiv.innerHTML = `
                    <article class="article-wrapper">
                        <div class="rounded-lg container-project" style="background: ${gradients[gradientIndex]}">
                            <div class="project-title text-nowrap hidden-text">${item.trText}</div>
                        </div>
                        <div class="project-info">
                            <div class="flex-pr">
                                <div class="project-title text-nowrap">${item.engText}</div>
                            </div>
                                <div class="types">
                                <span style="background-color: rgba(165, 96, 247, 0.43); color: rgb(85, 27, 177);" class="project-type">${item.wordId}</span>
                            </div>
                        </div>
                    </article>
                `;

                container.appendChild(colDiv);
            });
        },
        error: function (xhr, status, error) {
            alert('Bir hata oluştu: ' + error);
        }
    });
}
