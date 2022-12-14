var express = require('express');
var router = express.Router();
var dbPool = require('../db');
var db = dbPool.getPool();

const getPayments = 
    (req,res)=>{
        db.query('SELECT * FROM pagamento ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error
            } else {
                res.render('dashboard/payment',{data: results.rows})
            }
            //res.status(200).json(results.rows)
        })
    };

const insertPaymentForm = 
    (req,res)=>{
        res.render('dashboard/insertPayment');
    }

const getPaymentById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM pagamento WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.render('dashboard/updatePayment', {data: results.rows[0]});
            }
            //res.status(200).json(results.rows)
        })
    };

const createPayment = 
    (req,res)=>{
        const {numeroCarta, scadenza, codeSicurezza, tipo } = req.body
        db.query('INSERT INTO pagamento (numero_carta, scadenza, code_sicurezza, tipo) VALUES ($1,$2,$3,$4) RETURNING id;', [numeroCarta, scadenza, codeSicurezza, tipo], (error,results)=>{
            if(error){
                console.log("Errore strategico");
                res.status(500).json({"message":error,"code":500,"result":results,"postdata":req.body});
            } else {
                //res.status(201).json({"result":results})
                //res.status(201).send("MethodPayment added with ID: " + results.rows)
                res.redirect('/dashboard/payment')
            }
            
        })
    };

const updatePayment = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {numeroCarta, scadenza, codeSicurezza, tipo } = req.body
        db.query('UPDATE pagamento SET numero_carta=$1, scedenza=$2, code_sicurezza=$3, tipo=$4 WHERE id=$5;',
        [numeroCarta, scadenza, codeSicurezza, tipo ],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.redirect('/dashboard/payment')
            }
            //res.status(200).send("MethodPayment modified with ID: " + id)
        })


    };

const deletePayment= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM pagamento WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.redirect('/dashboard/payment')
            }
            //res.status(200).send("MethodPayment deleted with ID: " + id)
        })
    };

module.exports = {getPayments,getPaymentById,createPayment,updatePayment,deletePayment,insertPaymentForm};