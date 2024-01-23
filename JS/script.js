$(document).ready(function () {
  const container = $(".container");
  const currentDate = dayjs().format("YYYY-MM-DD");
  const currentHour = dayjs().hour();
  const currentDayElement = $("#currentDay");

  currentDayElement.text(dayjs().format("dddd, MMMM D"));

  function generateTimeBlocks() {
    container.empty(); 

    for (let hour = 9; hour <= 17; hour++) {
      const timeBlock = $("<div>", { class: "row time-block" });
      const timeColumn = $("<div>", { class: "col-2 hour", text: `${hour}:00 ${hour < 12 ? 'am' : 'pm'}` });
      const textColumn = $("<textarea>", { class: "col-9 description" });
      const saveColumn = $("<button>", { class: "col-1 saveBtn" }).html('<i class="fas fa-save"></i>');

      container.append(timeBlock.append(timeColumn, textColumn, saveColumn));

      let timeClass = hour < currentHour ? "past" : hour === currentHour ? "present" : "future";
      timeBlock.addClass(timeClass);

      const savedEvent = localStorage.getItem(`event_${currentDate}T${hour}`);
      if (savedEvent) textColumn.val(savedEvent);
    }
  }

   generateTimeBlocks();

   container.on("click", ".saveBtn", function () {
     const hour = $(this).siblings(".hour").text().split(":")[0];
     const eventText = $(this).siblings(".description").val();
     localStorage.setItem(`event_${currentDate}T${hour}`, eventText);
   });
 });