/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Observa la eliminación de una categoría
exports.onDeleteCategory = functions.firestore
    .document("categories/{categoryId}")
    .onDelete(async (_, context) => {
      const categoryId = context.params.categoryId;

      // Obtén todas las notas que hacen referencia a la categoría eliminada
      const notesRef = admin.firestore().collection("notes");
      const snapshot = await notesRef
          .where("tags", "array-contains", categoryId)
          .get();

      // Elimina la categoría de las notas relacionadas
      const batch = admin.firestore().batch();
      snapshot.forEach((doc) => {
        const noteRef = notesRef.doc(doc.id);
        batch.update(noteRef, {
          tags: admin.firestore.FieldValue.arrayRemove(categoryId),
        });
      });

      // Ejecuta la operación de eliminación en lote
      await batch.commit();

      console.log(`Categoría ${categoryId} eliminada y actualizada en notas.`);
    });
