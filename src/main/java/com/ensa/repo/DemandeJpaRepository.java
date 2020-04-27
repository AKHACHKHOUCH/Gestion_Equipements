package com.ensa.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensa.entities.Demande;
import com.ensa.entities.Demandeur;

@Repository
public interface DemandeJpaRepository extends JpaRepository<Demande, Integer> {
	
	public Demande save(Demande demande);
	public List<Demande> findAll();
	public List<Demande> findByDemandeur(Demandeur demandeur);
	public Demande findById(int id);
	public List<Demande> findByDateDemande(Date dateDemande);
	public List<Demande> findByTypeEvent(String typeEvant);
	public List<Demande> findByEtat(String etat);
	public List<Demande> findByDateReservation(Date dateReservation);
	public List<Demande> findByDateReservationAfterAndDateReservationBefore(Date dateDebut, Date dateFin);
	public void deleteById(int id);
	public void deleteByTypeEvent(String typeEvent);
	public void deleteByEtat(String etat);
	public void deleteAll();
	

}