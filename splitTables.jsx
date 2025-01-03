
// ----------------------------------------------------------------------------------------------------------------------

// This code is developed by Victor Olufemi Adewumi
// This code should be used with attribution to the createForm
// (c) January 2025

// ----------------------------------------------------------------------------------------------------------------------


var activeDoc = app.activeDocument;
var selectedElement = activeDoc.selection[0];
var parentTable = selectedElement.parent.parent;

if (parentTable.constructor.name != "Table") {
    alert("Ensure your cursor is positioned within a table cell's text in the desired row.");
    exit();
}

// Initialize variables to hold table and row data
var columnCount = parentTable.columns.length;
var targetRow = selectedElement.parent.parentRow;
var targetCells = targetRow.cells;
var textBlocks = [];
var maxParagraphCount = 0;

// Determine the maximum number of paragraphs in any cell
for (var i = 0; i < columnCount; i++) {
    var paragraphs = targetCells[i].texts[0].paragraphs;
    textBlocks.push(paragraphs);
    maxParagraphCount = Math.max(maxParagraphCount, paragraphs.length);
}

// Configure GREP preferences to clean up paragraph markers
app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.findWhat = "\\r";
app.changeGrepPreferences.changeTo = "";

// Insert new rows and rearrange content
for (var rowIndex = maxParagraphCount - 1; rowIndex > 0; rowIndex--) {
    var newRow = parentTable.rows.add(1634104421, targetRow);
    targetRow = targetRow.rows[0]; // Update target row reference

    for (var colIndex = 0; colIndex < columnCount; colIndex++) {
        try {
            var currentParagraph = textBlocks[colIndex][rowIndex];
            currentParagraph.select();
            app.cut();
            newRow.cells[colIndex].texts[0].insertionPoints[0].select();
            app.paste();
            newRow.cells[colIndex].changeGrep();
        } catch (error) {
            // Handle cases where paragraphs may be fewer than maxParagraphCount
        }
    }
}

// Clean up paragraph markers in the original row
targetRow.changeGrep();

// ------------------------------------------------------------------------------------------------------------
// Thanks for trying out the code
// ------------------------------------------------------------------------------------------------------------