import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: "20px",
  },

  table: {
    display: "table",
    width: "90%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  text: {
    fontSize: 10,
  },
  deal: {
    margin: "0 20px 20px 0",
  },
});

export function PdfDocument({ users, deal }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.deal}>
          <Text style={styles.text}>deal label : {deal.deal_label}</Text>
          <Text style={styles.text}>
            deal description : {deal.deal_description}
          </Text>
          <Text style={styles.text}>deal price : {deal.deal_price}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>firstName</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>lastName</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Company Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Status</Text>
            </View>
          </View>

          {users
            ? users.map((user, index) => {
                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{user.firstName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{user.lastName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {user.enterprise.company_name}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{user.deals.deal}</Text>
                    </View>
                  </View>
                );
              })
            : ""}
        </View>
      </Page>
    </Document>
  );
}
