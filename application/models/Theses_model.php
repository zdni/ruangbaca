<?php

class Theses_model extends CI_Model {
    private $_table = 'theses';

    public function create( $data = NULL )
    {
        if ( $data ) {
            $this->db->insert( $this->_table, $data);
            $insert_id = $this->db->insert_id();
            return $insert_id;
        }
        return false;
    }

    public function update( $id = NULL, $data = NULL )
    {
        if ( $id && $data ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->update( $this->_table, $data );
        }
        return false;
    }

    public function delete( $id = NULL )
    {
        if ( $id ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->delete( $this->_table );
        }
        return false;
    }

    public function thesis( $id = NULL, $document_id = NULL, $specialization_id = NULL, $storage_id = NULL )
    {
        if( $id ) $this->db->where( $this->_table . '.id', $id);
        if( $document_id ) $this->db->where( $this->_table . '.document_id', $document_id);
        return $this->theses( NULL, $specialization_id, $storage_id );
    }

    public function theses( $title = NULL, $specialization_id = NULL, $storage_id = NULL )
    {
        $this->db->select( $this->_table . '.*' );
        $this->db->select( 'documents.code' );
        $this->db->select( 'documents.title' );
        $this->db->select( 'documents.slug' );
        $this->db->select( 'documents.writer' );
        $this->db->select( 'documents.cover' );
        $this->db->select( 'documents.type' );
        $this->db->select( 'specializations.name AS specialization' );
        $this->db->select( 'storages.name AS storage' );
        $this->db->join(
            'documents',
            'documents.id = theses.document_id',
            'join'
        );
        $this->db->join(
            'specializations',
            'specializations.id = theses.specialization_id',
            'join'
        );
        $this->db->join(
            'storages',
            'storages.id = theses.storage_id',
            'join'
        );

        if( $specialization_id ) $this->db->where( $this->_table . '.specialization_id', $specialization_id);
        if( $storage_id ) $this->db->where( $this->_table . '.storage_id', $storage_id);
        if( $title ) $this->db->where( 'documents.title LIKE', '%'.$title.'%');
        
        return $this->db->get( $this->_table );
    }
}

?>