document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector<HTMLFormElement>("#calculatorForm");
    const resultDiv = document.querySelector<HTMLDivElement>("#result");
    const loadingDiv = document.querySelector<HTMLDivElement>("#loading");

    const recyclingInput = document.querySelector<HTMLInputElement>("#recycling");
    const recyclingError = document.querySelector<HTMLDivElement>("#recyclingError");

    if (recyclingInput) {
        recyclingInput.addEventListener("input", () => {
            const value = parseInt(recyclingInput.value);
            if (value < 1 || value > 10) {
                if (recyclingError) recyclingError.classList.remove("hidden");
                recyclingInput.setCustomValidity("Please enter a value between 1 and 10.");
            } else {
                if (recyclingError) recyclingError.classList.add("hidden");
                recyclingInput.setCustomValidity("");
            }
        });
    }
    
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Validate recycling input before submitting the form
        const recyclingValue = parseInt(recyclingInput?.value || "0");
        if (recyclingValue < 1 || recyclingValue > 10) {
            alert("Recycling habits must be between 1 and 10.");
            return;
        }

        const data = {
            travel: Number((document.querySelector<HTMLInputElement>("#travel")?.value) || 0),
            diet: Number((document.querySelector<HTMLInputElement>("#diet")?.value) || 0),
            energy: Number((document.querySelector<HTMLInputElement>("#energy")?.value) || 0),
            household: Number((document.querySelector<HTMLInputElement>("#household")?.value) || 1),
            renewable: Number((document.querySelector<HTMLInputElement>("#renewable")?.value) || 0),
            recycling: Number((document.querySelector<HTMLInputElement>("#recycling")?.value) || 0),
            vehicle: (document.querySelector<HTMLSelectElement>("#vehicle")?.value) || "electric",
            water: Number((document.querySelector<HTMLInputElement>("#water")?.value) || 0),
            waste: Number((document.querySelector<HTMLInputElement>("#waste")?.value) || 0),
            electricitySource: (document.querySelector<HTMLSelectElement>("#electricitySource")?.value) || "renewable"
        };

        if (loadingDiv) {
            loadingDiv.classList.remove("hidden");
        }

        try {
            const response = await fetch("/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }

            const result = await response.json();

            if (resultDiv) {
                resultDiv.classList.remove("hidden");
                document.querySelector<HTMLParagraphElement>("#carbonFootprint")!.textContent = `Your Carbon Footprint: ${result.carbonFootprint.toFixed(2)} kg CO₂`;
                document.querySelector<HTMLParagraphElement>("#waterUsage")!.textContent = `Your Water Usage: ${result.waterUsage.toFixed(2)} liters`;
                const suggestionsList = document.querySelector<HTMLUListElement>("#suggestions")!;
                suggestionsList.innerHTML = result.suggestions.map((suggestion: string) => `<li>${suggestion}</li>`).join('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (loadingDiv) {
                loadingDiv.classList.add("hidden");
            }
        }
    });
});
