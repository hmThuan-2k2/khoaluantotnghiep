package com.dendau.backendspring.services.processing_newspaper;

import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.models.ProcessingNewspaper;

public class ProcessingNewspaperComparator implements java.util.Comparator<ProcessingNewspaper>{

    @Override
    public int compare(ProcessingNewspaper o1, ProcessingNewspaper o2) {
        if (o1.getTimeCreate().getTime() > o2.getTimeCreate().getTime())
            return 1;
        else return 0;
    }
}
